<?php

namespace App\Controller;

use App\Entity\Statistic;
use App\Entity\UserProfile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class StatisticController
{
    #[Route('/star-trek/statistic', name: 'api_Statistic')]
    public function index(): JsonResponse
    {



        /** @var Statistic $user */



        return new JsonResponse([
            "myPlanet"=>$user->getMyPlanet(),
            "allPlanet"=>$user->getAllPlanet(),
            "myComet"=>$user->getMyComet(),
            "allComet"=>$user->getAllComet(),
            "firstLinePlanet"=>$user->getFirstLinePlanet(),
            "structurePlanet"=>$user->getStructurePlanet(),
            "totalSum"=>'',
            "myInviterIncome"=>$user->getMyInviterIncome(),
            "active"

        ]);

    }

}