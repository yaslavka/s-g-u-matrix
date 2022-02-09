<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211231083304 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE statistic_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_profile_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE statistic (id INT NOT NULL, user_profile_id INT DEFAULT NULL, all_planet INT DEFAULT 0 NOT NULL, my_planet INT DEFAULT 0 NOT NULL, all_comet INT DEFAULT 0 NOT NULL, my_comet INT DEFAULT 0 NOT NULL, first_line_planet INT DEFAULT 0 NOT NULL, structure_planet INT DEFAULT 0 NOT NULL, my_inviter_income INT DEFAULT 0 NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_649B469C6B9DD454 ON statistic (user_profile_id)');
        $this->addSql('CREATE TABLE user_profile (id INT NOT NULL, referral_id INT DEFAULT NULL, statistic_id INT DEFAULT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, finance_password VARCHAR(255) DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, instagram VARCHAR(255) DEFAULT NULL, telegram VARCHAR(255) DEFAULT NULL, vkontakte VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, balance INT DEFAULT 0 NOT NULL, transit_balance INT DEFAULT NULL, registration_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, activation_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, is_verified BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D95AB405F85E0677 ON user_profile (username)');
        $this->addSql('CREATE INDEX IDX_D95AB4053CCAA4B7 ON user_profile (referral_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D95AB40553B6268F ON user_profile (statistic_id)');
        $this->addSql('ALTER TABLE statistic ADD CONSTRAINT FK_649B469C6B9DD454 FOREIGN KEY (user_profile_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_profile ADD CONSTRAINT FK_D95AB4053CCAA4B7 FOREIGN KEY (referral_id) REFERENCES user_profile (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_profile ADD CONSTRAINT FK_D95AB40553B6268F FOREIGN KEY (statistic_id) REFERENCES statistic (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE user_profile DROP CONSTRAINT FK_D95AB40553B6268F');
        $this->addSql('ALTER TABLE statistic DROP CONSTRAINT FK_649B469C6B9DD454');
        $this->addSql('ALTER TABLE user_profile DROP CONSTRAINT FK_D95AB4053CCAA4B7');
        $this->addSql('DROP SEQUENCE statistic_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_profile_id_seq CASCADE');
        $this->addSql('DROP TABLE statistic');
        $this->addSql('DROP TABLE user_profile');
    }
}
