import React from "react";
import Intro from "./intro";
import Faq from "./faq";


const Reward = () => {
  return (
      <div>
        <Intro />
        <main className="bg-white text-black ">
          <section className="bg-black text-white text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Start earning rewards in 3 easy steps</h2>
            <div className="flex flex-row md:flex-col justify-around items-center">
              <div className="p-4">
                <p className="text-2xl font-bold mb-2">1</p>
                <p>Join the program</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold mb-2">2</p>
                <p>Make Purchases and Complete tasks</p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-bold mb-2">3</p>
                <p>Earn Rewards</p>
              </div>
            </div>
            <button className="bg-red-600 text-white py-2 px-6 rounded-full mt-6">Start Earning Rewards</button>
          </section>

          <section className="text-center p-12 bg-gray-100">
            <h2 className="text-3xl font-bold mb-4">No money? No Problem</h2>
            <p className="text-lg mb-6">You can get rewards via a plethora of ways on Azany without spending a dime!</p>
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded shadow">
                <p>Purchase an Item</p>
                <p>2 points per $1</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Create an account</p>
                <p>250 points</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Follow us on Instagram</p>
                <p>100 points</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Like our Facebook Page</p>
                <p>100 points</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Follow us on Twitter</p>
                <p>100 points</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Sign up to our mailing list</p>
                <p>100 points</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Refer a friend</p>
                <p>500 points</p>
              </div>
              <div className="bg-white p-6 rounded shadow">
                <p>Write a product review</p>
                <p>100 points</p>
              </div>
            </div>
            <button className="bg-red-600 text-white py-2 px-6 rounded-full mt-6">Start Earning Rewards</button>
          </section>
        </main>
        <Faq />
      </div>
  );
};


export default Reward;
