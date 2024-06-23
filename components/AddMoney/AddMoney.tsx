import { ChangeEvent, useState } from "react";
import Button from "../shared/Button";
import ButtonOutline from "../shared/ButtonOutline";
import Card from "../shared/Card";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "viem";
import { useRouter } from "next/router";
import Assets from "./AssetList";
import DropdownButton from "./AssetDropDown";

const AddMoney = () => {
  const ethAmounts = ["100", "500", "1000", "5000"];
  const [selectedAmount, setSelectedAmount] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(
    "Welcome to the other side my fren, enjoy the $HIGHER"
  );

  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    address,
  });

  const router = useRouter();

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(event.target.value);
  };

  return (
    <Card>
      <div className="font-sans flex justify-between pb-4 flex-col lg:flex-row gap-4">
        <div className="flex flex-col lg:w-3/5 w-full">        
            <Assets/>
        </div>
        <div className="lg:flex lg:flex-col md:ml-[20%] items-start w-4/5 lg:gap-4">
          <div className="md:flex">
        <label
            htmlFor="higherAmount"
            className="text-dark-grey lg:text-base text-sm leading-loose tracking-tighter"
          >
            Enter token amount to send
            <div className="flex">
            <div className="bg-beige rounded-xl px-4 sm:px-8 flex gap-1 items-center mt-2 lg:w-fit w-full justify-between">
              <input
                id="higherAmount"
                placeholder={`1 ${balanceData?.symbol}`}
                className="bg-beige outline-none py-4"
                value={selectedAmount}
                onChange={handleAmountChange}
              />
              <button
                type="button"
                className="text-dark-grey font-sans lg:text-md text-sm"
                onClick={() =>
                  balanceData &&
                  setSelectedAmount(formatEther(balanceData?.value).slice(0, 6))
                }
              >
                max
              </button>

            </div>
            </div>

          </label>
          <div className="mt-8 ml-2">
          <DropdownButton/>
          </div>
          </div>

          
        <label
            htmlFor="recipientEmail"
            className="text-dark-grey lg:text-base text-sm leading-loose tracking-tighter flex flex-col mt-8 w-full md:w-[80%]"
          >
            Recipient&apos;s Email
            <input
              id="recipientEmail"
              type="email"
              placeholder="Enter Recipient's Email Address"
              className="bg-beige rounded-xl px-4 sm:px-8 py-4 flex gap-4 items-center mt-2 outline-none w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="flex gap-4 mt-4 flex-wrap justify-end">
            <ButtonOutline
              content="Cancel"
              onClick={() => router.push("/dashboard")}
            />
            <Button
              content="SEND"
              onClick={() =>
                router.push(
                  `/confirm?amount=${selectedAmount}&email=${email}&note=${note}`
                )
              }
              disabled={selectedAmount == "" || email == ""}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddMoney;
