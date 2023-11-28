import {
  PostsData,
  TransformedPostsData,
  UserData,
  UserDetails,
} from "../types/types";

function findUserIdData(
  userId: number,
  userJsonData: UserData[]
): UserDetails | null {
  let result: UserDetails | null = null;
  userJsonData.forEach((data) => {
    if (data.id == userId) {
      let temp = { ...data };
      delete temp.id;
      result = temp;
      return;
    }
  });

  return result;
}

export async function fetchPosts() {
  try {
    const postData = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postJsonData: PostsData[] = await postData.json();

    const userData = await fetch("https://jsonplaceholder.typicode.com/users");
    const userJsonData: UserData[] = await userData.json();

    let transformedData: TransformedPostsData = {};
    //   console.log({ jsonData });

    for (let post of postJsonData) {
      if (transformedData[post.userId]) {
        transformedData[post.userId]?.postData.push(post);
      } else {
        const userDetails = findUserIdData(post.userId, userJsonData);
        if (userDetails == null) {
          throw new Error();
        } else if (userDetails != null) {
          transformedData[post.userId] = { userDetails, postData: [post] };
        }
      }
    }

    //   console.log({ transformedData });
    return transformedData;
  } catch {
    return null;
  }
}

export async function fetchCountries() {
  try {
    const data = await fetch("https://worldtimeapi.org/api/timezone");
    const jsonData: string[] = await data.json();

    return ["None", ...jsonData];
  } catch {
    return [];
  }
}

export async function fetchTime(area: string) {
  try {
    const region = area.split("/");
    const data = await fetch(
      `https://worldtimeapi.org/api/timezone/${region[0]}/${
        region?.[1] ?? ""
      }/${region?.[2] ?? ""}`
    );
    const jsonData = await data.json();

    return jsonData.utc_offset;
  } catch {
    return new Date();
  }
}
