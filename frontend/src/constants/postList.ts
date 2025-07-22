import { parseISO, format } from 'date-fns';
import post from "../../public/img/post.png"
import post2 from "../../public/img/post2.png"
import  post3 from "../../public/img/post3.png"


function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}
export const postList =
    [
        {
            id: 1,
            title: "Nigeria is a great naton, Contrary to popular belief",
            image: post,
            date: getDate(),
            category: "Entertainment",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        },
        {
            id: 1,
            title: "Nigeria is a great naton, Contrary to popular belief",
            image: post2,
            date: getDate(),
            category: "Entertainment",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        },
        {
            id: 1,
            title: "Nigeria is a great naton, Contrary to popular belief",
            image: post3,
            date: getDate(),
            category: "Entertainment",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        },
        {
            id: 1,
            title: "Nigeria is a great naton, Contrary to popular belief",
            image: post3,
            date: getDate(),
            category: "Entertainment",
            description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
        }
    ]