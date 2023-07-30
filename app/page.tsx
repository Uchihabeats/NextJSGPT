'use client'
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

type Inputs = {
  type: string,
  content: string,
};

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => gpt(data.content);
  const [data, setData] = useState<string>('');

  const gpt = async (content: string) => {
    setData('Generating...')
    const configuration = new Configuration({
      apiKey: '',
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }],
    });
    console.log(chatCompletion.data.choices[0].message.content);
    setData(chatCompletion.data.choices[0].message.content)
  }

  return (
    <main className="bg-blue-200 min-h-screen">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-white w-full md:w-1/2 p-10 rounded-md">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600 font-bold">Type</label>
              <input className="border border-gray-300 rounded-md h-10 pl-2" type="text" defaultValue="test" {...register("type")} />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-gray-600 font-bold">Content</label>
              <input className="border border-gray-300 rounded-md h-10 pl-2" type="text" {...register("content", { required: true })} />
            </div>
            {errors.content && <span className="text-red-500">This field is required</span>}

            <div className="flex justify-center w-full h-10 bg-blue-500 rounded-md text-gray-50">
              <button>GENERATE</button>
            </div>

          </form>

          <p className="mt-4 p-2 border">{data}</p>

        </div>
      </div>
    </main>

  );
}
