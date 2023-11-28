export interface PostsData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserDetails {
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserData extends UserDetails {
  id?: number;
}

export interface TransformedPostsData {
  [x: number]: {
    userDetails: UserDetails;
    postData: PostsData[];
  };
}

export interface StorePostsState {
  data: TransformedPostsData | null;
}
