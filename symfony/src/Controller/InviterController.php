<?php

namespace App\Controller;
use App\Entity\UserProfile;
use App\Repository\UserProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class InviterController extends AbstractController
{
    /**
     * @var UserProfileRepository
     */
    private UserProfileRepository $userProfileRepository;

    /**
     * @param UserProfileRepository $userProfileRepository
     */
    public function __construct(UserProfileRepository $userProfileRepository)
    {
        $this->userProfileRepository = $userProfileRepository;
    }

    #[Route('/inviter', name: 'app_inviter')]
    public function index(Request $request): JsonResponse
    {
        $username = $request->query->get('username');
        $referral = $this->userProfileRepository->findOneByUsername($username);

        if (!$referral) {
            return new JsonResponse(['success' => false, 'message' => 'Наставник с таким логином не существует']);
        }

        return new JsonResponse([
            'firstName' => $referral->getFirstName(),
            'lastName' => $referral->getLastName(),
            'avatar'=>"\/getFile\/avatar\/60fbf59320494.jpg"
        ]);
    }

}