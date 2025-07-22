<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HubResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => (string)$this->name,
            'location' => (string)$this->location,
            'note' => (string)$this->note,
            'city' => (string)$this->city,
            'country' => $this->country?->name,
            'collation_center' => $this->collationCenter?->name,
            'status' => (string)$this->status,
        ];
    }
}
