import { AdminEntity } from "../entity/admin.entity";
import { Admin } from "src/Admin/domain/admin";


export class AdminMapper{

    //map peristence data to domain
    static toDomain (raw: AdminEntity):Admin{
        const domainEntity = new Admin();
            domainEntity.id = raw.id;
            domainEntity.email = raw.email;
            domainEntity.firstname = raw.firstname;
            domainEntity.password = raw.password;
            domainEntity.proifilePics = raw.profilePics;
            domainEntity.role = raw.role;
            domainEntity.status = raw.status;
            domainEntity.lastname = raw.lastname;
            domainEntity.updatedAt = raw.updatedAt;
            domainEntity.createdAt = raw.createdAt;
            domainEntity.deletedAt = raw.deletedAt;
            domainEntity.isVerified = raw.isVerified;
            domainEntity.resetPasswordOtp = raw.resetPasswordOtp;
            domainEntity.resetPasswordOtpExpirationTime = raw.resetPasswordOtpExpirationTime;
            domainEntity.phoneNumber = raw.phoneNumber;
            return domainEntity
        
    }

    // map the user class to persistent domainentity

    static  toPersistence(domainEntity:Admin):AdminEntity{
        const persistenceEntity =new AdminEntity()

        if (domainEntity.id && typeof domainEntity.id === 'number') {
            persistenceEntity.id = domainEntity.id;
          }

          persistenceEntity.email = domainEntity.email;
          persistenceEntity.firstname = domainEntity.firstname;
          persistenceEntity.lastname = domainEntity.lastname;
          persistenceEntity.password = domainEntity.password;
          persistenceEntity.phoneNumber = domainEntity.phoneNumber;
          persistenceEntity.profilePics = domainEntity.proifilePics;
          persistenceEntity.isVerified = domainEntity.isVerified;
          persistenceEntity.role = domainEntity.role;
          persistenceEntity.status = domainEntity.status;
          persistenceEntity.resetPasswordOtp = domainEntity.resetPasswordOtp;
          persistenceEntity.resetPasswordOtpExpirationTime = domainEntity.resetPasswordOtpExpirationTime;
          persistenceEntity.createdAt = domainEntity.createdAt;
          persistenceEntity.updatedAt = domainEntity.updatedAt;
          persistenceEntity.deletedAt = domainEntity.deletedAt;
          return persistenceEntity
    }
}