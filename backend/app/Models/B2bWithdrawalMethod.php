<?php

namespace App\Models;

use App\Enum\UserType;
use App\Trait\ClearsResponseCache;
use Illuminate\Database\Eloquent\Model;

class B2bWithdrawalMethod extends Model
{
    use ClearsResponseCache;

    protected $fillable = [
        'country_id',
        'user_id',
        'account_name',
        'account_number',
        'account_type',
        'bank_name',
        'is_default',
        'platform',
        'recipient',
        'reference',
        'recipient_code',
        'routing_number',
        'bic_swift_code',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class,'country_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class,'user_id')->where('type',UserType::B2B_BUYER)->withDefault([
            'name'=> 'guest'
        ]);
    }
}
