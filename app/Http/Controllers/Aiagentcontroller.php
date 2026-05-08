<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Aiagentcontroller extends Controller
{
    public function handle(Request $request)
    {
        try {

            $request->validate([
                'message' => 'required|string|max:2000',
            ]);

            $message = $request->message;

            Log::info("User message: " . $message);

            // ─────────────────────────────
            // STEP 1: First API call
            // ─────────────────────────────

            $response1 = Http::timeout(30)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
                    'Content-Type' => 'application/json',
                    'HTTP-Referer' => config('app.url'),
                    'X-Title' => 'LionsBank AI',
                ])
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',

                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'You are LionsBank AI Assistant.'
                        ],
                        [
                            'role' => 'user',
                            'content' => $message
                        ]
                    ],

                    'reasoning' => [
                        'enabled' => true
                    ]
                ]);

            $data1 = $response1->json();

            Log::info("STEP 1 RESPONSE:", $data1);

            if (!isset($data1['choices'][0]['message'])) {
                return response()->json([
                    'reply' => $data1['error']['message'] ?? 'No response'
                ], 500);
            }

            $assistantMessage = $data1['choices'][0]['message']['content'] ?? '';
            $reasoningDetails = $data1['choices'][0]['message']['reasoning_details'] ?? null;

            // ─────────────────────────────
            // STEP 2: Follow-up reasoning (optional)
            // ─────────────────────────────

            $messages = [
                [
                    'role' => 'user',
                    'content' => $message
                ],
                [
                    'role' => 'assistant',
                    'content' => $assistantMessage,
                    'reasoning_details' => $reasoningDetails
                ],
                [
                    'role' => 'user',
                    'content' => 'Are you sure? Think carefully.'
                ]
            ];

            $response2 = Http::timeout(30)
                ->withHeaders([
                    'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
                    'Content-Type' => 'application/json',
                ])
                ->post('https://openrouter.ai/api/v1/chat/completions', [
                    'model' => 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',

                    'messages' => $messages,

                    'reasoning' => [
                        'enabled' => true
                    ]
                ]);

            $data2 = $response2->json();

            Log::info("STEP 2 RESPONSE:", $data2);

            $finalReply =
                $data2['choices'][0]['message']['content']
                ?? $assistantMessage
                ?? 'No response';

            return response()->json([
                'reply' => $finalReply
            ]);

        } catch (\Exception $e) {

            Log::error("AI ERROR: " . $e->getMessage());

            return response()->json([
                'reply' => 'AI server error'
            ], 500);
        }
    }
} 