type RatingType = {
  rate: string;
  count: string;
};

export type ProductType = {
  id: number;
  title: string;
  price: string;
  rating: RatingType;
  category: string;
  description: string;
  image: string;
};

type ReviewType = {
  username: string;
  rating: number;
  time: string;
  comment: string;
};

export const reviews: ReviewType[] = [
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Madelina',
    rating: 5,
    time: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
