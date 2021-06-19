<?php

namespace App\Repository;

use App\Models\Likes;

class LikeRepository
{
    public function isUserLiked($userId, $postId)
    {
        $isUserLiked = Likes::where('user_id', $userId)
            ->where('post_id', $postId)
            ->exists();
        return $isUserLiked;
    }
    public function createUserLikes($userId, $postId)
    {
        $isUserLiked = Likes::create([
            'user_id' => $userId,
            'post_id' => $postId,
        ]);
        return $isUserLiked;
    }
    public function deleteUserLikes($userId, $postId)
    {
        $isUserLiked = Likes::where('user_id', $userId)
            ->where('post_id', $postId)
            ->delete();
        return $isUserLiked;
    }
}
