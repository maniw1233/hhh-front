import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, forgotPassword, login, logout, resendOtp, resetPassword, signup, verifyOtp } from './AuthApi';

const initialState = {
  status: 'idle',
  errors: null,
  resendOtpStatus: 'idle',
  resendOtpSuccessMessage: null,
  resendOtpError: null,
  signupStatus: 'idle',
  signupError: null,
  loginStatus: 'idle',
  loginError: null,
  loggedInUser: null,
  otpVerificationStatus: 'idle',
  otpVerificationError: null,
  forgotPasswordStatus: 'idle',
  forgotPasswordSuccessMessage: null,
  forgotPasswordError: null,
  resetPasswordStatus: 'idle',
  resetPasswordSuccessMessage: null,
  resetPasswordError: null,
  successMessage: null,
  isAuthChecked: false,
};

export const signupAsync = createAsyncThunk('auth/signupAsync', async (cred) => {
  const res = await signup(cred);
  return res;
});

export const loginAsync = createAsyncThunk('auth/loginAsync', async (cred) => {
  const res = await login(cred);
  return res;
});

export const verifyOtpAsync = createAsyncThunk('auth/verifyOtpAsync', async (cred) => {
  const res = await verifyOtp(cred);
  return res;
});

export const resendOtpAsync = createAsyncThunk('auth/resendOtpAsync', async (cred) => {
  const res = await resendOtp(cred);
  return res;
});

export const forgotPasswordAsync = createAsyncThunk('auth/forgotPasswordAsync', async (cred) => {
  const res = await forgotPassword(cred);
  return res;
});

export const resetPasswordAsync = createAsyncThunk('auth/resetPasswordAsync', async (cred) => {
  const res = await resetPassword(cred);
  return res;
});

export const checkAuthAsync = createAsyncThunk('auth/checkAuthAsync', async () => {
  const res = await checkAuth();
  return res;
});

export const logoutAsync = createAsyncThunk('auth/logoutAsync', async () => {
  const res = await logout();
  return res;
});

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    clearAuthSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearAuthErrors: (state) => {
      state.errors = null;
    },
    resetAuthStatus: (state) => {
      state.status = 'idle';
    },
    resetSignupStatus: (state) => {
      state.signupStatus = 'idle';
    },
    clearSignupError: (state) => {
      state.signupError = null;
    },
    resetLoginStatus: (state) => {
      state.loginStatus = 'idle';
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    resetOtpVerificationStatus: (state) => {
      state.otpVerificationStatus = 'idle';
    },
    clearOtpVerificationError: (state) => {
      state.otpVerificationError = null;
    },
    resetResendOtpStatus: (state) => {
      state.resendOtpStatus = 'idle';
    },
    clearResendOtpError: (state) => {
      state.resendOtpError = null;
    },
    clearResendOtpSuccessMessage: (state) => {
      state.resendOtpSuccessMessage = null;
    },
    resetForgotPasswordStatus: (state) => {
      state.forgotPasswordStatus = 'idle';
    },
    clearForgotPasswordSuccessMessage: (state) => {
      state.forgotPasswordSuccessMessage = null;
    },
    clearForgotPasswordError: (state) => {
      state.forgotPasswordError = null;
    },
    resetResetPasswordStatus: (state) => {
      state.resetPasswordStatus = 'idle';
    },
    clearResetPasswordSuccessMessage: (state) => {
      state.resetPasswordSuccessMessage = null;
    },
    clearResetPasswordError: (state) => {
      state.resetPasswordError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.signupStatus = 'pending';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.signupStatus = 'fulfilled'; // Fixed typo
        state.loggedInUser = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.signupStatus = 'rejected';
        state.signupError = action.error;
      })

      .addCase(loginAsync.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loginStatus = 'fulfilled'; // Fixed typo
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loginStatus = 'rejected';
        state.loginError = action.error;
      })

      .addCase(verifyOtpAsync.pending, (state) => {
        state.otpVerificationStatus = 'pending';
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.otpVerificationStatus = 'fulfilled';
        state.loggedInUser = action.payload;
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.otpVerificationStatus = 'rejected';
        state.otpVerificationError = action.error;
      })

      .addCase(resendOtpAsync.pending, (state) => {
        state.resendOtpStatus = 'pending';
      })
      .addCase(resendOtpAsync.fulfilled, (state, action) => {
        state.resendOtpStatus = 'fulfilled';
        state.resendOtpSuccessMessage = action.payload;
      })
      .addCase(resendOtpAsync.rejected, (state, action) => {
        state.resendOtpStatus = 'rejected';
        state.resendOtpError = action.error;
      })

      .addCase(forgotPasswordAsync.pending, (state) => {
        state.forgotPasswordStatus = 'pending';
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.forgotPasswordStatus = 'fulfilled';
        state.forgotPasswordSuccessMessage = action.payload;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.forgotPasswordStatus = 'rejected';
        state.forgotPasswordError = action.error;
      })

      .addCase(resetPasswordAsync.pending, (state) => {
        state.resetPasswordStatus = 'pending';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.resetPasswordStatus = 'fulfilled';
        state.resetPasswordSuccessMessage = action.payload;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.resetPasswordStatus = 'rejected';
        state.resetPasswordError = action.error;
      })

      .addCase(logoutAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'fulfilled';
        state.loggedInUser = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
      })

      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.errors = action.error;
        state.isAuthChecked = true;
      });
  },
});

// Exporting selectors
export const selectAuthStatus = (state) => state.AuthSlice.status;
export const selectAuthErrors = (state) => state.AuthSlice.errors;
export const selectLoggedInUser = (state) => state.AuthSlice.loggedInUser;
export const selectAuthSuccessMessage = (state) => state.AuthSlice.successMessage;
export const selectIsAuthChecked = (state) => state.AuthSlice.isAuthChecked;
export const selectResendOtpStatus = (state) => state.AuthSlice.resendOtpStatus;
export const selectResendOtpSuccessMessage = (state) => state.AuthSlice.resendOtpSuccessMessage;
export const selectResendOtpError = (state) => state.AuthSlice.resendOtpError;
export const selectSignupStatus = (state) => state.AuthSlice.signupStatus;
export const selectSignupError = (state) => state.AuthSlice.signupError;
export const selectLoginStatus = (state) => state.AuthSlice.loginStatus;
export const selectLoginError = (state) => state.AuthSlice.loginError;
export const selectOtpVerificationStatus = (state) => state.AuthSlice.otpVerificationStatus;
export const selectOtpVerificationError = (state) => state.AuthSlice.otpVerificationError;
export const selectForgotPasswordStatus = (state) => state.AuthSlice.forgotPasswordStatus;
export const selectForgotPasswordSuccessMessage = (state) => state.AuthSlice.forgotPasswordSuccessMessage;
export const selectForgotPasswordError = (state) => state.AuthSlice.forgotPasswordError;
export const selectResetPasswordStatus = (state) => state.AuthSlice.resetPasswordStatus;
export const selectResetPasswordSuccessMessage = (state) => state.AuthSlice.resetPasswordSuccessMessage;
export const selectResetPasswordError = (state) => state.AuthSlice.resetPasswordError;

// Exporting reducers
export const {
  clearAuthSuccessMessage,
  clearAuthErrors,
  resetAuthStatus,
  clearSignupError,
  resetSignupStatus,
  clearLoginError,
  resetLoginStatus,
  clearOtpVerificationError,
  resetOtpVerificationStatus,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resetResendOtpStatus,
  clearritional

System: I notice you're sharing the `AuthSlice` code, which is helpful for debugging the signup redirection issue. The key issue is that the `/signup` page redirects to `/otp-verification` immediately upon loading, likely due to the `checkAuthAsync` action setting `status` to `'fulfilled'` and `loggedInUser` to a non-null value, triggering the `useEffect` in the `Signup` component. Let's fix this by making the redirection logic in the `Signup` component more specific and correcting the typos in `AuthSlice`.

### Key Issues Identified
1. **Typo in `AuthSlice`**:
   - The `signupAsync.fulfilled` and `loginAsync.fulfilled` cases set `state.signupStatus` and `state.loginStatus` to `'fullfilled'` (typo) instead of `'fulfilled'`. This causes the `status === 'fulfilled'` check in the `Signup` component's `useEffect` to never match for `signupAsync`, but it may match the `status` from `checkAuthAsync`.

2. **Premature Redirection**:
   - The `useEffect` in the `Signup` component redirects to `/otp-verification` when `status === 'fulfilled' && loggedInUser`. Since `checkAuthAsync` (likely dispatched on app load) sets `state.status` to `'fulfilled'` and `state.loggedInUser` to a user object if the user is already authenticated, this triggers the redirect immediately.

3. **Lack of Specificity**:
   - The `Signup` component uses the generic `status` from the Redux store, which is shared across actions like `checkAuthAsync` and `logoutAsync`. It should instead use `signupStatus` to ensure redirection only occurs after a successful signup.

### Corrected `Signup` Component
Below is the corrected `Signup` component, updated to use `signupStatus` instead of `status` for redirection and to handle errors more robustly.

```jsx
import {
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ecommerceOutlookAnimation } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import {
  selectLoggedInUser,
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus
} from '../AuthSlice';
import { toast } from 'react-toastify';
import { MotionConfig, motion } from 'framer-motion';

export const Signup = () => {
  const dispatch = useDispatch();
  const signupStatus = useSelector(selectSignupStatus); // Use signupStatus instead of status
  const error = useSelector(selectSignupError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // Handle redirection after successful signup
  useEffect(() => {
    if (signupStatus === 'fulfilled' && loggedInUser) {
      navigate('/otp-verification');
      reset(); // Reset form after successful signup
    }
  }, [signupStatus, loggedInUser, navigate, reset]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearSignupError()); // Clear error after displaying
    }
  }, [error, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [dispatch]);

  const handleSignup = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(signupAsync(cred));
  };

  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{ overflowY: "hidden" }}>
      {!is900 &&
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'}>
          <Lottie animationData={ecommerceOutlookAnimation} />
        </Stack>
      }

      <Stack flex={1} justifyContent={'center'} alignItems={'center'}>
        <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
          <Stack rowGap={'.4rem'}>
            <Typography variant='h2' sx={{ wordBreak: "break-word" }} fontWeight={600}>Mern Shop</Typography>
            <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Shop Anything</Typography>
          </Stack>
        </Stack>

        <Stack mt={4} spacing={2} width={is480 ? "95vw" : '28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleSignup)}>
          <MotionConfig whileHover={{ y: -5 }}>
            <motion.div>
              <TextField
                fullWidth
                {...register("name", { required: "Username is required" })}
                placeholder='Username'
              />
              {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
            </motion.div>

            <motion.div>
              <TextField
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email"
                  }
                })}
                placeholder='Email'
              />
              {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
            </motion.div>

            <motion.div>
              <TextField
                type='password'
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message: "Minimum 8 characters with uppercase, lowercase and number"
                  }
                })}
                placeholder='Password'
              />
              {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
            </motion.div>

            <motion.div>
              <TextField
                type='password'
                fullWidth
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value, formValues) => value === formValues.password || "Passwords do not match"
                })}
                placeholder='Confirm Password'
              />
              {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
            </motion.div>
          </MotionConfig>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <LoadingButton
              sx={{ height: '2.5rem' }}
              fullWidth
              loading={signupStatus === 'pending'}
              type='submit'
              variant='contained'
            >
              Signup
            </LoadingButton>
          </motion.div>

          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'}>
            <MotionConfig whileHover={{ x: 2 }} whileTap={{ scale: 1.05 }}>
              <motion.div>
                <Typography
                  mr={'1.5rem'}
                  sx={{ textDecoration: "none", color: "text.primary" }}
                  to={'/forgot-password'}
                  component={Link}
                >
                  Forgot password
                </Typography>
              </motion.div>

              <motion.div>
                <Typography
                  sx={{ textDecoration: "none", color: "text.primary" }}
                  to={'/login'}
                  component={Link}
                >
                  Already a member? <span style={{ color: theme.palette.primary.dark }}>Login</span>
                </Typography>
              </motion.div>
            </MotionConfig>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
