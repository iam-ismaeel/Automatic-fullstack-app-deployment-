<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'featured',
        'meta_title',
        'meta_description'
    ];

    public function subcategory()
    {
        return $this->hasMany(SubCategory::class, 'category_id');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
