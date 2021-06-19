<?php

namespace App\Models;

use App\Models\Likes;
use App\Models\Comments;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Posts extends Model
{
    use HasFactory;
    protected $table = 'posts';
    protected $connection = 'mysql';

    protected $guarded = [];

    public function comments()
    {
        return $this->hasMany(Comments::class, 'post_id');
    }

    public function likes()
    {
        return $this->hasMany(Likes::class, 'post_id');
    }
}
