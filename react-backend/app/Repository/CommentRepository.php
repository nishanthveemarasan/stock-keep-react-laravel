<?php

namespace App\Repository;

use App\Models\User;
use App\Models\Posts;
use App\Models\Comments;

class CommentRepository
{
    public function getCommentCount()
    {
        $count = Comments::get()->count();
        return $count;
    }
    public function getAllCommets()
    {
        $posts = Comments::join('users', 'users.id', '=', 'comments.user_id')
            ->join('posts', 'posts.id', '=', 'comments.post_id')
            ->select('users.name', 'posts.title', 'comments.*')
            ->paginate(5);;
        return $posts;
    }

    public function getUserComments($id)
    {
        $posts = Posts::find($id)->comments()->paginate(5);
        return $posts;
    }

    public function create($data)
    {
        $create = Comments::create($data);
        return $create;
    }

    public function getPostComments($id)
    {
        $posts = Posts::find($id)->comments()
            ->join('users', 'users.id', '=', 'comments.user_id')
            ->orderBy('comments.created_at', 'desc')
            ->select('users.name', 'comments.*')->paginate(5);
        return $posts;
    }
}
