export const FormErrorMessage = {
   EMAIL_REQUIRED: `Email is Required`,
   INVALID_DOB: `Please enter a valid date of birth.`,
   GENDER_REQUIRED: `Gender is Required`,
   EMAIL_NOT_REGISTERD: `Sorry, this email address is not registered with us.`,
   INVALID_EMAIL: `Please enter a valid email address.`,
   INVALID_WEIGHT: `Please enter a valid weight`,
   PASSWORD_REQUIRED: `Password is Required`,
   USERNAME_REQUIRED: `Username is Required`,
   NAME_REQUIRED: `Name is Required`,
   USERNAME_GT_4: `Username must be 4 or more characters`,
   PASSWORD_GT_4: `Password must be 4 or more characters`,
   FIRST_NAME_REQUIRED: `Please fill out your first name.`,
   LAST_NAME_REQUIRED: `Please fill out your last name.`,
   PASSWORD_DOES_NOT_MATCH: `Please does not match.`,
   INVALID_MOBILE: `Mobile number must contain only digits`,
   PET_NAME_REQUIRED: `Please fill out your pet’s name.`,
   PET_TYPE_REQUIRED: `Please select a pet type.`,
   PET_BREED_REQUIRED: `Please select a pet breed.`,
   PET_SIZE_REQUIRED: `Please select a pet size.`,
   PET_GENDER_REQUIRED: `Please select your pet’s sex.`,
   MOBILE_PREFIX_REQUIRED: `Please select mobile prefix.`,
   DEFAULT_LOCAITON_REQUIRED: `Please assign user to a location.`,
   CALENDAR_EVENT_TITLE_REQUIRED: `Please fill out title.`,
   CALENDAR_EVENT_START_TIME_REQUIRED: `Start Time is required.`,
   CALENDAR_EVENT_END_TIME_REQUIRED: `End Time is required.`,
}

export const SuccessMessage = {
   SIGN_UP_COMPLETED: `Your account has been created successfully.`,
}

export const DynamicSuccessMessage = {
   CREATE_CUSTOMER_COMPLETED: (customerName: string) => (
      <div>
         Added new customer and pet data for
         <span className="pl-1 font-bold text-green">{customerName}</span>
      </div>
   ),
   UPDATE_CUSTOMER_COMPLETED: (customerName: string) => (
      <div>
         Changes to customer and pet data for
         <span className="pl-1 font-bold text-green">{customerName}</span> has been saved.
      </div>
   ),
   ADD_PET_COMPLETED: (customerName: string) => (
      <div>
         Added new pet data for
         <span className="pl-1 font-bold text-green">{customerName}</span>.
      </div>
   ),
   CREATE_USER_COMPLETED: (userFullName: string) => (
      <div>
         Added new user
         <span className="pl-1 font-bold text-green">{userFullName}</span>
      </div>
   ),
}

export const ErrorMessage = {
   CREATE_CUSTOMER_FAILED: (
      <div>
         <span className="pr-1 font-bold text-red-01">Save Error:</span> Please fill in all required
         customer and pet details.
      </div>
   ),
}
