<?php

namespace App\Controller;

use App\Entity\Statistic;
use App\Entity\UserProfile;
use App\Repository\UserProfileRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    private UserProfileRepository $userProfileRepository;

    public function __construct(UserProfileRepository $userProfileRepository)
    {
        $this->userProfileRepository = $userProfileRepository;
    }

    #[Route('/registration', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data['password'] || !$data['username']  || !$data['first_name']  || !$data['last_name']  || !$data['email']  || !$data['phone']) {
            return new JsonResponse(['success' => false, 'message' => 'Заполните все поля']);
        }

        $user = new UserProfile();

        $user->setPassword(
            $userPasswordHasherInterface->hashPassword(
                $user,
                $data['password']
            )
        );

        $user->setEmail($data['email']);
        $user->setFirstName($data['first_name']);
        $user->setLastName($data['last_name']);

        $username = $this->userProfileRepository->findOneByUsername($data['username']);
        if ($username) {
            return new JsonResponse(['success' => false, 'message' => 'Пользователь с таким логином уже существует']);
        } else {
            $user->setUsername($data['username']);
        }

        $phone = $this->userProfileRepository->findOneBy(['phone' => $data['phone']]);
        if ($phone) {
            return new JsonResponse(['success' => false, 'message' => 'Пользователь с таким телефоном уже существует']);
        } else {
            $user->setPhone($data['phone']);
        }

        $referral = $this->userProfileRepository->findOneByUsername($data['referral']);
        if ($referral) {
            $user->setReferral($referral);
        }

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($user);

        $statistic = new Statistic();
        $statistic->setUserProfile($user);

        $user->setStatistic($statistic);

        $entityManager->persist($statistic);

        $entityManager->flush();

        return new JsonResponse(['success' => true]);
    }
}
