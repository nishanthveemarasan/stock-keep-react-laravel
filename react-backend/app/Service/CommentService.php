<?php

namespace App\Service;

use App\Repository\CommentRepository;
use Throwable;

class CommentService
{
    public $commentRepository;

    function __construct(CommentRepository $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function getCommentCount()
    {
        try {
            return $this->commentRepository->getCommentCount();
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function getAllCommets()
    {
        try {
            return $this->commentRepository->getAllCommets();
        } catch (Throwable $e) {
            return $e;
        }
    }
    public function getUserComments($id)
    {
        try {
            return $this->commentRepository->getUserComments($id);
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function create($data)
    {
        $createComments =  $this->commentRepository->create($data);
        if ($createComments) {
            return array('msg' => "success");
        }
    }
    public function getPostComments($id)
    {

        return $this->commentRepository->getPostComments($id);
    }
}
