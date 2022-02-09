<?php

namespace App\Entity;

use App\Repository\UserProfileRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use DateTime;

/**
 * @ORM\Entity(repositoryClass=UserProfileRepository::class)
 */
class UserProfile implements UserInterface, PasswordAuthenticatedUserInterface
{
    public const ROLE_ADMIN = 'ROLE_ADMIN';

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private string $username;

    /**
     * @ORM\Column(type="json")
     */
    private array $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private string $password;

    /**
     * @var string|null
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $financePassword;

    /**
     * @ORM\ManyToOne(targetEntity=UserProfile::class, inversedBy="user_profile")
     * @ORM\JoinColumn(name="referral_id", referencedColumnName="id")
     */
    private ?UserProfile $referral;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $phone;

    /**
     * @ORM\OneToOne(targetEntity=Statistic::class, inversedBy="userProfile")
     * @ORM\JoinColumn(name="statistic_id", referencedColumnName="id")
     */
    private Statistic $statistic;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $instagram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $telegram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $vkontakte;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private ?string $description;

    /**
     * @var int
     * @ORM\Column(type="integer", options={"default" : 0})
     */
    private int $balance = 0;

    /**
     * @var int|null
     * @ORM\Column(type="integer", nullable=true)
     */
    private ?int $transitBalance;

    /**
     * @var DateTime
     * @ORM\Column(type="datetime")
     */
    private DateTime $registrationDate;

    /**
     * @var DateTime|null
     * @ORM\Column(type="datetime", nullable=true)
     */
    private ?DateTime $activationDate;

    /**
     * @var File|null
     */
    private ?File $avatar;

    /**
     * @ORM\Column(type="boolean")
     */
    private bool $isVerified = true;

    public function __construct()
    {
        $this->registrationDate = new DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function __toString(): string
    {
        return $this->username;
    }

    public function getReferral(): ?self
    {
        return $this->referral;
    }

    public function setReferral(?self $referral): self
    {
        $this->referral = $referral;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    public function getFullName(): string
    {
        return $this->firstName.' '.$this->lastName;
    }

    /**
     * @return Statistic
     */
    public function getStatistic(): Statistic
    {
        return $this->statistic;
    }

    /**
     * @param Statistic $statistic
     * @return UserProfile
     */
    public function setStatistic(Statistic $statistic): self
    {
        $this->statistic = $statistic;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getFinancePassword(): ?string
    {
        return $this->financePassword;
    }

    /**
     * @param string|null $financePassword
     */
    public function setFinancePassword(?string $financePassword): void
    {
        $this->financePassword = $financePassword;
    }

    /**
     * @return string|null
     */
    public function getInstagram(): ?string
    {
        return $this->instagram;
    }

    /**
     * @param string|null $instagram
     */
    public function setInstagram(?string $instagram): void
    {
        $this->instagram = $instagram;
    }

    /**
     * @return string|null
     */
    public function getTelegram(): ?string
    {
        return $this->telegram;
    }

    /**
     * @param string|null $telegram
     */
    public function setTelegram(?string $telegram): void
    {
        $this->telegram = $telegram;
    }

    /**
     * @return string|null
     */
    public function getVkontakte(): ?string
    {
        return $this->vkontakte;
    }

    /**
     * @param string|null $vkontakte
     */
    public function setVkontakte(?string $vkontakte): void
    {
        $this->vkontakte = $vkontakte;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     */
    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return int
     */
    public function getBalance(): int
    {
        return $this->balance;
    }

    /**
     * @param int $balance
     */
    public function setBalance(int $balance): void
    {
        $this->balance = $balance;
    }

    /**
     * @return int|null
     */
    public function getTransitBalance(): ?int
    {
        return $this->transitBalance;
    }

    /**
     * @param int|null $transitBalance
     */
    public function setTransitBalance(?int $transitBalance): void
    {
        $this->transitBalance = $transitBalance;
    }

    /**
     * @return DateTime
     */
    public function getRegistrationDate(): DateTime
    {
        return $this->registrationDate;
    }

    /**
     * @param DateTime $registrationDate
     */
    public function setRegistrationDate(DateTime $registrationDate): void
    {
        $this->registrationDate = $registrationDate;
    }

    /**
     * @return DateTime|null
     */
    public function getActivationDate(): ?DateTime
    {
        return $this->activationDate;
    }

    /**
     * @param DateTime|null $activationDate
     */
    public function setActivationDate(?DateTime $activationDate): void
    {
        $this->activationDate = $activationDate;
    }

    /**
     * @return File|null
     */
    public function getAvatar(): ?File
    {
        return $this->avatar;
    }

    /**
     * @param File|null $avatar
     */
    public function setAvatar(?File $avatar): void
    {
        $this->avatar = $avatar;
    }

}
