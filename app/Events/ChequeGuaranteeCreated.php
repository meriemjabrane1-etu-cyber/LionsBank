<?php

namespace App\Events;

use App\Models\ChequeGuarantee;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChequeGuaranteeCreated
{
    use Dispatchable, SerializesModels;

    public function __construct(public ChequeGuarantee $guarantee)
    {
    }
}
