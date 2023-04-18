import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { JoinTable } from "typeorm";
import { Permission } from "../../permission/model/permission.entity";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissions_id', referencedColumnName: 'id' }
  })
  permissions: Permissions[];
}
