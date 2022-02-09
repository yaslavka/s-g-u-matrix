<?php

namespace App\Controller;

use App\Entity\UserProfile;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class UserProfileController extends AbstractController
{
    #[Route('/user_profile', name: 'api_user', methods: ['GET','POST'])]
    public function index(): JsonResponse
    {

        /** @var UserProfile $user */
        $user = $this->getUser();



        return new JsonResponse([
            'activePartners' => 7,
            'avatar' => "/getFile/avatar/60fbf59320494.jpg",
            'can_create_comment' => false,
            'can_use_school' => true,
            'clones' => 0,
            'comets' => 0,
            'firstEnter' => false,
            'firstLine' => 7,
            'income' => 37075,
            'inviterAvatar' => "/getFile/avatar/60fbf59320494.jpg",
            'locale' => "ru",
            'middleName' => "",
            'myInstagram' => null,
            'myTg' => null,
            'myVk' => null,
            'partners' => 7,
            'showInviter' => false,
            'tg' => "",
            'tgKey' => "3155bafd856c8db07b9a440540a13855",
            'userOnLink' => 0,
            'vk' => "",

        ]);


    }
}
