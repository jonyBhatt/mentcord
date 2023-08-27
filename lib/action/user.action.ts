import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "../db";

export const OnboardProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }

  //find user
  let currentProfile = await db.profile.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (currentProfile) {
    return currentProfile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
