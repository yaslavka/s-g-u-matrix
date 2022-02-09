<?php

namespace App\Controller;

use App\Entity\UserProfile;
use App\Repository\UserProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class StructureController extends AbstractController
{


    /**
     * @param UserProfileRepository $userProfileRepository
     */
    public function __construct(UserProfileRepository $userProfileRepository)
    {
        $this->userProfileRepository = $userProfileRepository;
    }
    #[Route('/api/structure', name: 'api_structure')]
    public function index(Request $request): JsonResponse
    {
        /** @var UserProfile $userProfile */
        $userProfile= $request->query->get('username');
$userProfile = $this->userProfileRepository->findEveryoneIInvited($userProfile);


        return new JsonResponse(data: array('id' => $userProfile->getId(), 'firstName' => $userProfile->getFirstName(), 'lastName' => $userProfile->getLastName()));
    }

}