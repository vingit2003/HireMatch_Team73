import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";

const SignUp = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isRegister, setIsRegister] = useState(true);
  const [accountType, setAccountType] = useState("seeker");

  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  let from = location.state?.from?.pathname || "/";

  const closeModal = () => setOpen(false);

  const onSubmit = async (data) => {
    let URL = null

    if (isRegister) {
      if (accountType === "seeker") {
        URL = "auth/register"
      } else URL = "companies/register";
    } else {
      if (accountType === "seeker") {
        URL = "auth/login"
      } else URL = "companies/login";
    }

    try {
      const res = await apiRequest({
        url: URL,
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res?.message);
      } else {
        setErrMsg("");
        const data = { token: res?.token, ...res?.user };
        dispatch(Login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        window.location.replace(from);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Transition appear show={open || false}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-100'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-96 h-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mt-20'>
                  <Dialog.Title
                    as='h3'
                    className='text-xl font-semibold lwading-6 text-gray-900 text-center'
                  >
                    {isRegister ? "Create a new account" : "Sign in to your account"}
                  </Dialog.Title>

                  <div className='w-full flex items-center justify-center py-2 mt-3'>
                    <button
                      className={`flex-1 px-1 py-2 rounded-full text-sm outline-none ${accountType === "seeker"
                        ? "bg-[#005b54] text-white font-semibold"
                        : "bg-white border border-[#01332f] text-[#01332f]"
                        }`}
                      onClick={() => setAccountType("seeker")}
                    >
                      User Account
                    </button>
                    <button
                      className={`flex-1 px-2 py-2 rounded-full text-sm outline-none ${accountType !== "seeker"
                        ? "bg-[#005b54] text-white font-semibold"
                        : "bg-white border border-[#01332f] text-[#01332f]"
                        } ml-2`}
                      onClick={() => setAccountType("company")}
                    >
                      Company Account
                    </button>
                  </div>

                  <form
                    className='w-full flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {isRegister && (
                      <div className='w-full flex gap-1 md:gap-2'>
                        <div
                          className={`${accountType === "seeker" ? "w-1/2" : "w-full"
                            }`}
                        >
                          <TextInput
                            name={
                              accountType === "seeker" ? "firstName" : "name"
                            }
                            label={
                              accountType === "seeker"
                                ? "First name:"
                                : "Company name:"
                            }
                            placeholder={
                              accountType === "seeker"
                                ? "John"
                                : "Company name"
                            }
                            type='text'
                            register={register(
                              accountType === "seeker" ? "firstName" : "name",
                              {
                                required:
                                  accountType === "seeker"
                                    ? "Required field!"
                                    : "Required field!",
                              }
                            )}
                            error={
                              accountType === "seeker"
                                ? errors.firstName
                                  ? errors.firstName?.message
                                  : ""
                                : errors.name
                                  ? errors.name?.message
                                  : ""
                            }
                          />
                        </div>

                        {accountType === "seeker" && isRegister && (
                          <div className='w-1/2'>
                            <TextInput
                              name='lastName'
                              label='Last name:'
                              placeholder='Doe'
                              type='text'
                              register={register("lastName", {
                                required: "Required field!",
                              })}
                              error={
                                errors.lastName ? errors.lastName?.message : ""
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <TextInput
                      name='email'
                      label='Email:'
                      placeholder='abc@xyz.com'
                      type='email'
                      register={register("email", {
                        required: "Required field!",
                      })}
                      error={errors.email ? errors.email.message : ""}
                    />

                    <div className='w-full flex gap-1 md:gap-2'>
                      <div className={`${isRegister ? "w-1/2" : "w-full"}`}>
                        <TextInput
                          name='password'
                          label='Password:'
                          placeholder='Password'
                          type='password'
                          register={register("password", {
                            required: "Required field!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                        />
                      </div>

                      {isRegister && (
                        <div className='w-1/2'>
                          <TextInput
                            label='Re-enter password:'
                            placeholder='Password'
                            type='password'
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Not matching!";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                                errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                        </div>
                      )}
                    </div>

                    {errMsg && (
                      <span
                        role='alert'
                        className='text-sm text-[#f75959] mt-0.5'
                      >
                        {errMsg}
                      </span>
                    )}

                    <div className='mt-2 flex mx-auto'>
                      <CustomButton
                        type='submit'
                        containerStyles={`inline-flex justify-center rounded-md bg-[#005b54] px-8 py-2 text-sm font-semibold text-white outline-none hover:bg-[#01332f]`}
                        title={isRegister ? "Sign Up" : "Sign In"}
                      />
                    </div>
                  </form>

                  <div className='mt-4 flex justify-center'>
                    <p className='text-sm text-gray-700'>
                      {isRegister
                        ? "Already have an account?"
                        : "No account?"}

                      <span
                        className='text-sm text-[#0e4c31] ml-2 hover:text-[#0e4c31] hover:font-semibold cursor-pointer italic'
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Sign In" : "Sign Up"}
                      </span>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUp;