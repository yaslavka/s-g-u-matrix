<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\MappedSuperclass
 */
class Statistic
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\OneToOne(targetEntity=UserProfile::class, inversedBy="statistic")
     * @ORM\JoinColumn(name="user_profile_id", referencedColumnName="id")
     */
    private UserProfile $userProfile;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $allPlanet = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $myPlanet = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $allComet = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $myComet = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $firstLinePlanet = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $structurePlanet = 0;

    /**
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $myInviterIncome = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return UserProfile
     */
    public function getUserProfile(): UserProfile
    {
        return $this->userProfile;
    }

    /**
     * @param UserProfile $userProfile
     * @return Statistic
     */
    public function setUserProfile(UserProfile $userProfile): self
    {
        $this->userProfile = $userProfile;

        return $this;
    }

    public function getAllPlanet(): int
    {
        return $this->allPlanet;
    }

    public function setAllPlanet(int $allPlanet): self
    {
        $this->allPlanet = $allPlanet;

        return $this;
    }

    public function getMyPlanet(): int
    {
        return $this->myPlanet;
    }

    public function setMyPlanet(int $myPlanet): self
    {
        $this->myPlanet = $myPlanet;

        return $this;
    }

    public function getAllComet(): int
    {
        return $this->allComet;
    }

    public function setAllComet(int $allComet): self
    {
        $this->allComet = $allComet;

        return $this;
    }

    public function getMyComet(): int
    {
        return $this->myComet;
    }

    public function setMyComet(int $myComet): self
    {
        $this->myComet = $myComet;

        return $this;
    }

    public function getFirstLinePlanet(): int
    {
        return $this->firstLinePlanet;
    }

    public function setFirstLinePlanet(int $firstLinePlanet): self
    {
        $this->firstLinePlanet = $firstLinePlanet;

        return $this;
    }

    public function getStructurePlanet(): int
    {
        return $this->structurePlanet;
    }

    public function setStructurePlanet(int $structurePlanet): self
    {
        $this->structurePlanet = $structurePlanet;

        return $this;
    }

    public function getMyInviterIncome(): ?int
    {
        return $this->myInviterIncome;
    }

    public function setMyInviterIncome(int $myInviterIncome): self
    {
        $this->myInviterIncome = $myInviterIncome;

        return $this;
    }
}
