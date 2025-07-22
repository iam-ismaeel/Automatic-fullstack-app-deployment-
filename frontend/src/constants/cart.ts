type TCart = {
  image: string;
  title: string;
  size: string;
  color: string;
  material: string;
  seller: string;
  price: number;
  count: number;
};

const cart: TCart[] = [
  {
    image: "/img/feat-1.png",
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Leather",
    seller: "Azany",
    price: 360,
    count: 1,
  },
  {
    image: "/img/feat-1.png",
    title: "T-shirts with multiple colors, for men and lady",
    size: "M",
    color: "Black",
    material: "Leather",
    seller: "Azany",
    price: 360,
    count: 1,
  },
  {
    image: "/img/feat-1.png",
    title: "Sport Jacket",
    size: "M",
    color: "Black",
    material: "Leather",
    seller: "Azany",
    price: 360,
    count: 1,
  },
];

const address = [
  {
    name: "John Stuart",
    address: "1234 Main St. Apt. 4B",
    mobile: "1234567890",
    email: "john@live.com",
  },
  {
    name: "John Doe",
    address: "1234 Main St. Apt. 4B",
    mobile: "1234567890",
    email: "john@doe.com",
  },
];

export default cart;

export { address };
