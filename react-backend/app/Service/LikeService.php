<?php

namespace App\Service;

use App\Repository\LikeRepository;
use App\Repository\PostRepository;

class LikeService
{
    public $likeRepository;
    public $postRepository;
    function __construct(LikeRepository $likeRepository, PostRepository $postRepository)
    {
        $this->likeRepository = $likeRepository;
        $this->postRepository = $postRepository;
    }

    public function isPostLiked($data)
    {
        $isUserLiked = $this->likeRepository->isUserLiked($data['userId'], $data['postId']);
        $totalPostLikes = $this->postRepository->postLikes($data['postId']);
        return array(
            'userLiked' => $isUserLiked,
            'postLikes' => $totalPostLikes,

        );
    }
    public function updateLikes($data)
    {
        if ($data['status']) {
            $deleteUserLikes = $this->likeRepository->deleteUserLikes($data['userId'], $data['postId']);
        } else {
            $createUserLikes = $this->likeRepository->createUserLikes($data['userId'], $data['postId']);
        }
        return array(
            'status' => 'success',
        );
    }
}
