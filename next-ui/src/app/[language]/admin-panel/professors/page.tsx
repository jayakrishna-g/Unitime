'use client';
import { RoleEnum } from "@/services/api/types/role";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";

function ProfessorsPage() {
    return <div>Professors</div>
}


export default withPageRequiredAuth(ProfessorsPage, { roles: [RoleEnum.ADMIN] });