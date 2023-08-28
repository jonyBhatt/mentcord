import {CreateServerModal} from "@/components/modals";
import { OnboardProfile } from "@/lib/action/user.action";
import { db } from "@/lib/db";
import { redirect } from 'next/navigation';
const SetupPage = async () => {
    const profile  = await OnboardProfile()
    const server = await db.server.findFirst({
        where: { 
            members: {
                some: {
                    profileId: profile.id
                }
            }
         },
    })

    if (server) {
        return redirect(`/server/${server.id}`)
    }
    return (
        <>
            <CreateServerModal user={profile} />
        </>
  );
};

export default SetupPage;
