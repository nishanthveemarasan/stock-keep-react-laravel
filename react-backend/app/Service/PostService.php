<?php

namespace App\Service;

use App\Repository\PostRepository;
use Throwable;

class PostService
{
    public $postRepository;

    function __construct(PostRepository $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function getPostCount()
    {
        try {
            return $this->postRepository->getPostCount();
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function getAllPosts()
    {
        try {
            return $this->postRepository->getAllPosts();
        } catch (Throwable $e) {
            return $e;
        }
    }
    public function getUserPosts($id)
    {
        try {
            return $this->postRepository->getUserPosts($id);
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function create($data)
    {

        $createPost =  $this->postRepository->create($data);
        if ($createPost) {
            return array('msg' => "You Post has been Created Successfully !!!");
        }
    }

    public function edit($data)
    {
        $postId = $data['id'];

        unset($data['id']);
        $editPost =  $this->postRepository->edit($postId, $data);
        if ($editPost) {
            return array('msg' => "You Post has been Altered Succesfully!!!");
        }
    }
    public function delete($id)
    {

        $deletePost =  $this->postRepository->delete($id);
        if ($deletePost) {
            return array('msg' => "You Post has been Deleted Successfully!!!");
        }
    }
}
