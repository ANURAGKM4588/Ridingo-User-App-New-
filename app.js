/**
 * RIDINGO — MINIMAL APPLE-STYLE CHAUFFEUR APPLICATION
 * Architecture: Clean Vanilla JS State Machine & Fluid Multi-Page Router
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. APPLICATION STATE
  // ==========================================
  const state = {
    currentScreen: 'onboarding', // 'onboarding' | 'auth' | 'main' | 'booking'
    activeNavPage: 'home',       // 'home' | 'trips' | 'quick' | 'drivers' | 'garage'
    onboardSlideIndex: 0,
    activeCategory: 'hourly',   // 'hourly' | 'day' | 'airport' | 'special'
    airportDirection: 'pickup', // 'pickup' | 'drop'
    selectedHours: 4,
    hourlyRate: 149,
    selectedCarType: 'sedan',   // 'sedan' | 'hatchback' | 'suv' | 'luxury'
    selectedCar: {
      make: 'Mercedes C-Class',
      spec: 'Automatic • Sedan',
      regNo: 'KA 01 MJ 4402'
    },
    deviceMode: 'mobile' // 'mobile' | 'fluid'
  };

  // ==========================================
  // 2. DOM SELECTORS
  // ==========================================
  const screens = {
    onboarding: document.getElementById('screenOnboarding'),
    auth: document.getElementById('screenAuth'),
    main: document.getElementById('screenMainApp'),
    booking: document.getElementById('screenBooking')
  };

  const pages = {
    home: document.getElementById('pageHome'),
    trips: document.getElementById('pageTrips'),
    track: document.getElementById('pageTrack'),
    drivers: document.getElementById('pageChauffeurs'),
    garage: document.getElementById('pageGarage')
  };

  // Top Presentation Bar Jump Chips
  const jumpChips = document.querySelectorAll('.jump-chip');
  const btnPhoneView = document.getElementById('btnPhoneView');
  const btnFluidView = document.getElementById('btnFluidView');

  // iOS Dynamic Island & Status Bar
  const statusClock = document.getElementById('statusClock');
  const dynamicIsland = document.getElementById('dynamicIsland');
  const islandActivity = document.getElementById('islandActivity');
  const iosToast = document.getElementById('iosToast');
  const toastMessage = document.getElementById('toastMessage');

  // Onboarding
  const onboardTrack = document.getElementById('onboardTrack');
  const onboardIndicators = document.querySelectorAll('#onboardIndicators .indicator');
  const btnNextSlide = document.getElementById('btnNextSlide');
  const btnSkipOnboarding = document.getElementById('btnSkipOnboarding');

  // Auth Elements
  const btnBackToOnboard = document.getElementById('btnBackToOnboard');
  const authGlider = document.getElementById('authGlider');
  const authTabs = document.querySelectorAll('#authTabGroup .segment-tab');
  const authHeadline = document.getElementById('authHeadline');
  const authSubline = document.getElementById('authSubline');
  const authLoginStage = document.getElementById('authLoginStage');
  const authRegisterStage = document.getElementById('authRegisterStage');

  const chipEmailMode = document.getElementById('chipEmailMode');
  const btnBackToPhoneMode = document.getElementById('btnBackToPhoneMode');
  const formPhoneLogin = document.getElementById('formPhoneLogin');
  const formEmailLogin = document.getElementById('formEmailLogin');
  const btnPhoneSubmit = document.getElementById('btnPhoneSubmit');
  const btnEmailSubmit = document.getElementById('btnEmailSubmit');
  const btnAppleAuth = document.getElementById('btnAppleAuth');
  const btnGoogleAuth = document.getElementById('btnGoogleAuth');

  // Create Account Elements
  const inputSignupFirstName = document.getElementById('inputSignupFirstName');
  const inputSignupLastName = document.getElementById('inputSignupLastName');
  const btnSignupModePhone = document.getElementById('btnSignupModePhone');
  const btnSignupModeEmail = document.getElementById('btnSignupModeEmail');
  const boxSignupPhone = document.getElementById('boxSignupPhone');
  const boxSignupEmail = document.getElementById('boxSignupEmail');
  const inputSignupPhone = document.getElementById('inputSignupPhone');
  const inputSignupEmail = document.getElementById('inputSignupEmail');
  const btnSignupNext = document.getElementById('btnSignupNext');

  // Registration OTP Modal Elements
  const signupOtpModal = document.getElementById('signupOtpModal');
  const btnCloseSignupOtpModal = document.getElementById('btnCloseSignupOtpModal');
  const otpModalTitle = document.getElementById('otpModalTitle');
  const otpModalDesc = document.getElementById('otpModalDesc');
  const otpModalTarget = document.getElementById('otpModalTarget');
  const btnVerifySignupOtp = document.getElementById('btnVerifySignupOtp');
  const btnResendSignupOtp = document.getElementById('btnResendSignupOtp');
  const signupOtpTimer = document.getElementById('signupOtpTimer');
  const btnChangeContactMethod = document.getElementById('btnChangeContactMethod');
  const signupOtpPins = document.querySelectorAll('.otp-modal-pin');

  // Home Page Booking Elements
  const categoryGlider = document.getElementById('categoryGlider');
  const categoryTabs = document.querySelectorAll('#categorySelectionBar .cat-tab');
  const airportSectionBox = document.getElementById('airportSectionBox');
  const airportDirChips = document.querySelectorAll('#airportDirectionToggle .dir-chip');
  const inputFlightNo = document.getElementById('inputFlightNo');
  const airlineTag = document.getElementById('airlineTag');
  const flightStatusPill = document.getElementById('flightStatusPill');

  const inputFromLoc = document.getElementById('inputFromLoc');
  const inputToLoc = document.getElementById('inputToLoc');
  const btnSwapLocations = document.getElementById('btnSwapLocations');
  const btnClearFromLoc = document.getElementById('btnClearFromLoc');
  const btnClearToLoc = document.getElementById('btnClearToLoc');

  // Pickup Date & Time Module Elements
  const btnDtNow = document.getElementById('btnDtNow');
  const btnDtSchedule = document.getElementById('btnDtSchedule');
  const inputPickupDate = document.getElementById('inputPickupDate');
  const inputPickupTime = document.getElementById('inputPickupTime');
  const dispPickupDate = document.getElementById('dispPickupDate');
  const dispPickupTime = document.getElementById('dispPickupTime');

  const carTypeChips = document.querySelectorAll('#carTypeChipsGrid .car-type-chip');
  const dispSelectedCarTypeBadge = document.getElementById('dispSelectedCarTypeBadge');

  const hourlyConfigRow = document.getElementById('hourlyConfigRow');
  const durationSliderBox = document.getElementById('durationSliderBox');
  const durationPresetList = document.querySelectorAll('#durationPresetList .dur-chip');
  const dispDurationValue = document.getElementById('dispDurationValue');
  const dispFareAmount = document.getElementById('dispFareAmount');
  const dispFareSub = document.getElementById('dispFareSub');

  const btnChangeCar = document.getElementById('btnChangeCar');
  const garageDrawer = document.getElementById('garageDrawer');
  const btnCloseGarage = document.getElementById('btnCloseGarage');
  const carChoiceCards = document.querySelectorAll('.car-choice-card');
  const carModelLabel = document.querySelector('.car-model');
  const carTypeLabel = document.querySelector('.car-type');

  const btnBookChauffeur = document.getElementById('btnBookChauffeur');
  const btnCloseBooking = document.getElementById('btnCloseBooking');
  const btnCancelBooking = document.getElementById('btnCancelBooking');
  const btnShareTrip = document.getElementById('btnShareTrip');

  // iOS 27 Navbar
  const navDockItems = document.querySelectorAll('#iosNavbar .nav-dock-item');
  const navbarBubble = document.getElementById('navbarBubble');

  // ==========================================
  // 3. UTILITIES: LIVE CLOCK & TOAST
  // ==========================================
  function updateLiveClock() {
    const now = new Date();
    let hours = now.getHours();
    let mins = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    mins = mins < 10 ? '0' + mins : mins;
    if (statusClock) statusClock.textContent = `${hours}:${mins}`;
  }
  updateLiveClock();
  setInterval(updateLiveClock, 30000);

  let toastTimeout = null;
  function showToast(msg, icon = '⚡') {
    if (!iosToast) return;
    toastMessage.textContent = msg;
    document.getElementById('toastIcon').textContent = icon;
    iosToast.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      iosToast.classList.add('hidden');
    }, 2800);
  }

  // ==========================================
  // 4. SCREEN & PAGE ROUTING ARCHITECTURE
  // ==========================================
  function switchScreen(screenKey) {
    state.currentScreen = screenKey;

    Object.keys(screens).forEach(key => {
      if (key === screenKey) {
        screens[key].classList.remove('hidden');
      } else {
        screens[key].classList.add('hidden');
      }
    });

    // Update Jump Chips
    jumpChips.forEach(chip => {
      if (chip.dataset.screen === screenKey) {
        chip.classList.add('active');
      } else if (!chip.dataset.nav) {
        chip.classList.remove('active');
      }
    });

    // Dynamic Island Behavior
    if (dynamicIsland) {
      if (screenKey === 'booking') {
        dynamicIsland.style.width = '210px';
        islandActivity?.classList.remove('hidden');
      } else {
        dynamicIsland.style.width = '116px';
        islandActivity?.classList.add('hidden');
      }
    }
  }

  // Switch between the dedicated Navbar Pages
  function switchNavbarPage(pageKey) {
    if (pageKey === 'quick') pageKey = 'track';

    if (state.currentScreen !== 'main') {
      switchScreen('main');
    }

    state.activeNavPage = pageKey;

    Object.keys(pages).forEach(key => {
      if (key === pageKey) {
        pages[key].classList.remove('hidden');
        pages[key].classList.add('active');
      } else {
        pages[key].classList.remove('active');
        pages[key].classList.add('hidden');
      }
    });

    // Update iOS 27 Navbar items
    navDockItems.forEach(item => {
      if (item.dataset.tab === pageKey) {
        item.classList.add('active');
        updateNavbarPosition(item);
      } else {
        item.classList.remove('active');
      }
    });

    // Update presentation jump chips
    jumpChips.forEach(chip => {
      if (chip.dataset.nav === pageKey) {
        chip.classList.add('active');
      } else if (chip.dataset.nav) {
        chip.classList.remove('active');
      }
    });
  }

  // Desktop Jump Chips
  jumpChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (chip.dataset.screen) {
        switchScreen(chip.dataset.screen);
      } else if (chip.dataset.nav) {
        switchNavbarPage(chip.dataset.nav);
      }
    });
  });

  // Link on Home page teaser to go to Trips
  document.getElementById('linkGoToTrips')?.addEventListener('click', () => {
    switchNavbarPage('trips');
  });

  document.getElementById('btnProfileQuick')?.addEventListener('click', () => {
    switchNavbarPage('garage');
  });

  // ==========================================
  // 5. ONBOARDING SLIDES
  // ==========================================
  const onboardSlides = document.querySelectorAll('.onboard-slide');

  function updateOnboardingSlide(index) {
    state.onboardSlideIndex = index;
    onboardTrack.style.transform = `translateX(-${index * 100}%)`;

    onboardSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    onboardIndicators.forEach((ind, i) => {
      if (i === index) ind.classList.add('active');
      else ind.classList.remove('active');
    });

    if (index === 2) {
      btnNextSlide.querySelector('span').textContent = 'Get Started';
    } else {
      btnNextSlide.querySelector('span').textContent = 'Continue';
    }
  }

  onboardIndicators.forEach((ind, i) => {
    ind.style.cursor = 'pointer';
    ind.addEventListener('click', () => {
      updateOnboardingSlide(i);
    });
  });

  btnNextSlide.addEventListener('click', () => {
    if (state.onboardSlideIndex < 2) {
      updateOnboardingSlide(state.onboardSlideIndex + 1);
    } else {
      switchScreen('auth');
    }
  });

  btnSkipOnboarding.addEventListener('click', () => {
    switchScreen('auth');
  });

  btnBackToOnboard.addEventListener('click', () => {
    switchScreen('onboarding');
  });

  // ==========================================
  // 6. AUTH LOGIC (SIGN IN & CREATE ACCOUNT)
  // ==========================================
  let signupContactMode = 'phone';
  let signupOtpCountdown = 45;
  let signupTimerInterval = null;

  // Segmented Tab Switcher (Sign In vs Create Account)
  authTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      authGlider.style.transform = `translateX(${index * 100}%)`;

      const mode = tab.dataset.tab;
      if (mode === 'signup') {
        authLoginStage?.classList.add('hidden');
        authRegisterStage?.classList.remove('hidden');
        if (authHeadline) authHeadline.textContent = 'Create Account';
        if (authSubline) authSubline.textContent = 'Certified personal chauffeurs for your car';
      } else {
        authRegisterStage?.classList.add('hidden');
        authLoginStage?.classList.remove('hidden');
        if (authHeadline) authHeadline.textContent = 'Welcome to Ridingo';
        if (authSubline) authSubline.textContent = 'Chauffeur service for your personal car';
      }
    });
  });

  // Sign In: Email vs Mobile View Toggle
  if (chipEmailMode) {
    chipEmailMode.addEventListener('click', () => {
      formPhoneLogin.classList.add('hidden');
      formEmailLogin.classList.remove('hidden');
    });
  }

  if (btnBackToPhoneMode) {
    btnBackToPhoneMode.addEventListener('click', () => {
      formEmailLogin.classList.add('hidden');
      formPhoneLogin.classList.remove('hidden');
    });
  }

  // Create Account: Toggle between Mobile No and Email ID
  if (btnSignupModePhone) {
    btnSignupModePhone.addEventListener('click', () => {
      signupContactMode = 'phone';
      btnSignupModePhone.classList.add('active');
      btnSignupModeEmail.classList.remove('active');
      boxSignupPhone?.classList.remove('hidden');
      boxSignupEmail?.classList.add('hidden');
      inputSignupPhone?.focus();
    });
  }

  if (btnSignupModeEmail) {
    btnSignupModeEmail.addEventListener('click', () => {
      signupContactMode = 'email';
      btnSignupModeEmail.classList.add('active');
      btnSignupModePhone.classList.remove('active');
      boxSignupEmail?.classList.remove('hidden');
      boxSignupPhone?.classList.add('hidden');
      inputSignupEmail?.focus();
    });
  }

  // Timer countdown helper for OTP modal
  function startSignupOtpTimer() {
    clearInterval(signupTimerInterval);
    signupOtpCountdown = 45;
    if (signupOtpTimer) signupOtpTimer.textContent = '00:45';
    if (btnResendSignupOtp) btnResendSignupOtp.disabled = true;

    signupTimerInterval = setInterval(() => {
      signupOtpCountdown--;
      if (signupOtpTimer) {
        signupOtpTimer.textContent = `00:${signupOtpCountdown < 10 ? '0' : ''}${signupOtpCountdown}`;
      }
      if (signupOtpCountdown <= 0) {
        clearInterval(signupTimerInterval);
        if (btnResendSignupOtp) {
          btnResendSignupOtp.textContent = 'Resend Code Now';
          btnResendSignupOtp.disabled = false;
        }
      }
    }, 1000);
  }

  // Open OTP Verification Modal when user clicks "Next" in Create Account
  if (btnSignupNext) {
    btnSignupNext.addEventListener('click', () => {
      const firstName = inputSignupFirstName?.value.trim() || 'Alexander';
      const lastName = inputSignupLastName?.value.trim() || 'Vance';

      if (signupContactMode === 'phone') {
        const phone = inputSignupPhone?.value.trim() || '98450 12890';
        if (otpModalTitle) otpModalTitle.textContent = 'Verify Mobile Number';
        if (otpModalDesc) {
          otpModalDesc.innerHTML = `We sent a 4-digit verification code via SMS to <strong id="otpModalTarget">+91 ${phone}</strong>`;
        }
        showToast(`SMS OTP dispatched to +91 ${phone}`, '📱');
      } else {
        const email = inputSignupEmail?.value.trim() || 'alexander.v@icloud.com';
        if (otpModalTitle) otpModalTitle.textContent = 'Verify Email Address';
        if (otpModalDesc) {
          otpModalDesc.innerHTML = `We sent a 4-digit verification code to <strong id="otpModalTarget">${email}</strong>`;
        }
        showToast(`Verification code sent to ${email}`, '✉️');
      }

      // Open Modal Sheet
      signupOtpModal?.classList.remove('hidden');
      startSignupOtpTimer();

      // Focus first pin
      setTimeout(() => {
        signupOtpPins[0]?.focus();
        signupOtpPins[0]?.select();
      }, 150);
    });
  }

  // Auto-advance OTP pins in modal
  signupOtpPins.forEach((pin, index) => {
    pin.addEventListener('input', () => {
      if (pin.value && index < signupOtpPins.length - 1) {
        signupOtpPins[index + 1].focus();
      }
    });

    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !pin.value && index > 0) {
        signupOtpPins[index - 1].focus();
      } else if (e.key === 'Enter') {
        btnVerifySignupOtp?.click();
      }
    });
  });

  // Resend OTP inside modal
  if (btnResendSignupOtp) {
    btnResendSignupOtp.addEventListener('click', () => {
      const target = document.getElementById('otpModalTarget')?.textContent || 'your contact';
      showToast(`New verification code sent to ${target}`, '↻');
      startSignupOtpTimer();
    });
  }

  // Close OTP Modal
  function closeSignupOtpModal() {
    clearInterval(signupTimerInterval);
    signupOtpModal?.classList.add('hidden');
  }

  btnCloseSignupOtpModal?.addEventListener('click', closeSignupOtpModal);
  btnChangeContactMethod?.addEventListener('click', closeSignupOtpModal);
  signupOtpModal?.addEventListener('click', (e) => {
    if (e.target === signupOtpModal) {
      closeSignupOtpModal();
    }
  });

  // Verify OTP & Complete Registration (Allows proceeding without filling fields)
  btnVerifySignupOtp?.addEventListener('click', () => {
    const firstName = inputSignupFirstName?.value.trim() || 'Alexander';
    const greetingEl = document.querySelector('.greeting-heading');
    if (greetingEl) {
      greetingEl.textContent = `Good evening, ${firstName}`;
    }
    showToast(`Account verified! Welcome to Ridingo, ${firstName}`, '✓');
    closeSignupOtpModal();
    setTimeout(() => switchNavbarPage('home'), 450);
  });

  // Sign In Submissions (Allows immediate login without filling fields)
  btnPhoneSubmit?.addEventListener('click', () => {
    showToast('Verified via SMS OTP. Welcome!', '✓');
    setTimeout(() => switchNavbarPage('home'), 450);
  });

  btnEmailSubmit?.addEventListener('click', () => {
    const emailVal = inputEmail?.value.trim();
    const displayName = emailVal ? emailVal.split('@')[0] : 'Alexander';
    showToast(`Signed in as ${displayName}`, '✓');
    setTimeout(() => switchNavbarPage('home'), 450);
  });

  // Social Sign In (Shared between Sign In & Create Account)
  btnAppleAuth?.addEventListener('click', () => {
    showToast('Authenticated with Apple ID', '');
    setTimeout(() => switchNavbarPage('home'), 450);
  });

  btnGoogleAuth?.addEventListener('click', () => {
    showToast('Signed in with Google Account', 'G');
    setTimeout(() => switchNavbarPage('home'), 450);
  });

  // ==========================================
  // 6B. RIDINGO OFFICIAL LEGAL MODAL (TERMS & PRIVACY)
  // ==========================================
  const policyModal = document.getElementById('policyModal');
  const btnClosePolicy = document.getElementById('btnClosePolicy');
  const btnPolicyDone = document.getElementById('btnPolicyDone');
  const linkOpenTerms = document.getElementById('linkOpenTerms');
  const linkOpenPrivacy = document.getElementById('linkOpenPrivacy');
  const chipOpenPolicy = document.getElementById('chipOpenPolicy');
  const tabTerms = document.getElementById('tabTerms');
  const tabPrivacy = document.getElementById('tabPrivacy');
  const paneTerms = document.getElementById('paneTerms');
  const panePrivacy = document.getElementById('panePrivacy');
  const policyTabGroup = document.getElementById('policyTabGroup');
  const policyModalTitle = document.getElementById('policyModalTitle');
  const policyModalEyebrow = document.getElementById('policyModalEyebrow');
  const policyScrollBody = document.getElementById('policyScrollBody');

  function openPolicyModal(activeTab = 'terms') {
    if (!policyModal) return;
    policyModal.classList.remove('hidden');
    switchPolicyTab(activeTab);
    if (policyScrollBody) policyScrollBody.scrollTop = 0;
  }

  function closePolicyModal() {
    if (!policyModal) return;
    policyModal.classList.add('hidden');
  }

  function switchPolicyTab(mode) {
    if (mode === 'privacy') {
      policyTabGroup?.classList.add('privacy-active');
      tabTerms?.classList.remove('active');
      tabPrivacy?.classList.add('active');
      tabTerms?.setAttribute('aria-selected', 'false');
      tabPrivacy?.setAttribute('aria-selected', 'true');
      paneTerms?.classList.remove('active');
      panePrivacy?.classList.add('active');
      if (policyModalTitle) policyModalTitle.textContent = 'Privacy Policy';
      if (policyModalEyebrow) policyModalEyebrow.textContent = 'RIDINGO PRIVACY • ENGLISH';
    } else {
      policyTabGroup?.classList.remove('privacy-active');
      tabPrivacy?.classList.remove('active');
      tabTerms?.classList.add('active');
      tabPrivacy?.setAttribute('aria-selected', 'false');
      tabTerms?.setAttribute('aria-selected', 'true');
      panePrivacy?.classList.remove('active');
      paneTerms?.classList.add('active');
      if (policyModalTitle) policyModalTitle.textContent = 'Terms & Conditions';
      if (policyModalEyebrow) policyModalEyebrow.textContent = 'RIDINGO TERMS • ENGLISH';
    }
    if (policyScrollBody) policyScrollBody.scrollTop = 0;
  }

  linkOpenTerms?.addEventListener('click', (e) => {
    e.preventDefault();
    openPolicyModal('terms');
  });

  linkOpenPrivacy?.addEventListener('click', (e) => {
    e.preventDefault();
    openPolicyModal('privacy');
  });

  chipOpenPolicy?.addEventListener('click', (e) => {
    e.preventDefault();
    openPolicyModal('terms');
  });

  tabTerms?.addEventListener('click', () => switchPolicyTab('terms'));
  tabPrivacy?.addEventListener('click', () => switchPolicyTab('privacy'));

  btnClosePolicy?.addEventListener('click', closePolicyModal);
  btnPolicyDone?.addEventListener('click', () => {
    closePolicyModal();
    showToast('Legal terms acknowledged', '✓');
  });

  policyModal?.addEventListener('click', (e) => {
    if (e.target === policyModal) {
      closePolicyModal();
    }
  });

  // ==========================================
  // 7. CATEGORY SELECTION & STABLE DYNAMIC FARES
  // ==========================================
  function updateFareCalculation() {
    let fare = 0;
    let sub = '';

    if (state.activeCategory === 'hourly') {
      fare = state.selectedHours * state.hourlyRate;
      sub = `for ${state.selectedHours}h • ₹${state.hourlyRate}/h`;
    } else if (state.activeCategory === 'day') {
      fare = 1299;
      sub = 'Full Day • Max 10 hrs Flat';
    } else if (state.activeCategory === 'airport') {
      fare = 899;
      sub = 'BLR Airport Drop';
    } else if (state.activeCategory === 'special') {
      fare = 1899;
      sub = 'Outstation 12h Flat';
    }

    dispFareAmount.textContent = fare.toLocaleString('en-IN');
    dispFareSub.textContent = sub;
  }

  // Location & Category Stage Elements
  const dualLocationView = document.getElementById('dualLocationView');
  const specialOccasionBox = document.getElementById('specialOccasionBox');
  const occasionChips = document.querySelectorAll('#occasionChipsTrack .occ-chip');
  const inputAirportCarPickup = document.getElementById('inputAirportCarPickup');
  const btnClearAirportCarPickup = document.getElementById('btnClearAirportCarPickup');
  const lblAirportCarPickup = document.getElementById('lblAirportCarPickup');
  const inputAirportTerminal = document.getElementById('inputAirportTerminal');
  const btnClearAirportTerminal = document.getElementById('btnClearAirportTerminal');
  const lblAirportTerminal = document.getElementById('lblAirportTerminal');
  const inputAirportDest = document.getElementById('inputAirportDest');
  const btnClearAirportDest = document.getElementById('btnClearAirportDest');
  const lblAirportDest = document.getElementById('lblAirportDest');

  categoryTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      categoryGlider.style.transform = `translateX(${index * 100}%)`;
      
      const category = tab.dataset.category;
      state.activeCategory = category;

      // Smooth Stage Transitions as per user request
      if (category === 'hourly') {
        // Hourly: show dual location From & To, duration selection slider & pickup date/time
        dualLocationView.classList.remove('hidden');
        specialOccasionBox.classList.add('hidden');
        airportSectionBox.classList.add('hidden');
        hourlyConfigRow.style.display = 'flex';
        durationSliderBox?.classList.remove('hidden');
        dispDurationValue.textContent = `${state.selectedHours} Hours`;
      } else if (category === 'day') {
        // Day Service: fixed hour service (max 10 hours flat), no hour selection needed
        dualLocationView.classList.remove('hidden');
        specialOccasionBox.classList.add('hidden');
        airportSectionBox.classList.add('hidden');
        hourlyConfigRow.style.display = 'flex';
        durationSliderBox?.classList.add('hidden'); // Hide hour selection for Day
      } else if (category === 'airport') {
        // Airport: show Airport Concierge Transfer box, keep car type & date/time visible, hide duration slider
        dualLocationView.classList.add('hidden');
        specialOccasionBox.classList.add('hidden');
        airportSectionBox.classList.remove('hidden');
        hourlyConfigRow.style.display = 'flex';
        durationSliderBox?.classList.add('hidden');
      } else if (category === 'special') {
        // Special: keep From & To box, show occasion chips, car type & date/time module
        dualLocationView.classList.remove('hidden');
        specialOccasionBox.classList.remove('hidden');
        airportSectionBox.classList.add('hidden');
        hourlyConfigRow.style.display = 'flex';
        durationSliderBox?.classList.remove('hidden');
        dispDurationValue.textContent = `12 Hours (Event / Outstation)`;
      }

      updateFareCalculation();
      updateBookingButtonState();
    });
  });

  // ==========================================
  // 7B. DUAL LOCATION SWAP & CLEAR ACTIONS (HOME PAGE)
  // ==========================================
  let swapRotationAngle = 0;

  // Toggle visibility of clear (X) buttons based on whether input is filled
  function updateLocationClearButtons() {
    const fromVal = inputFromLoc ? inputFromLoc.value.trim() : '';
    const toVal = inputToLoc ? inputToLoc.value.trim() : '';
    const apCarVal = inputAirportCarPickup ? inputAirportCarPickup.value.trim() : '';
    const apTermVal = inputAirportTerminal ? inputAirportTerminal.value.trim() : '';
    const apDestVal = inputAirportDest ? inputAirportDest.value.trim() : '';
    
    if (btnClearFromLoc) {
      if (fromVal.length > 0) {
        btnClearFromLoc.classList.remove('hidden');
      } else {
        btnClearFromLoc.classList.add('hidden');
      }
    }
    
    if (btnClearToLoc) {
      if (toVal.length > 0) {
        btnClearToLoc.classList.remove('hidden');
      } else {
        btnClearToLoc.classList.add('hidden');
      }
    }

    if (btnClearAirportCarPickup) {
      if (apCarVal.length > 0) {
        btnClearAirportCarPickup.classList.remove('hidden');
      } else {
        btnClearAirportCarPickup.classList.add('hidden');
      }
    }

    if (btnClearAirportTerminal) {
      if (apTermVal.length > 0) {
        btnClearAirportTerminal.classList.remove('hidden');
      } else {
        btnClearAirportTerminal.classList.add('hidden');
      }
    }

    if (btnClearAirportDest) {
      if (apDestVal.length > 0) {
        btnClearAirportDest.classList.remove('hidden');
      } else {
        btnClearAirportDest.classList.add('hidden');
      }
    }
  }

  window.handleSwapLocations = function(e) {
    if (e) {
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
    }

    const fromEl = document.getElementById('inputFromLoc');
    const toEl = document.getElementById('inputToLoc');
    const swapBtn = document.getElementById('btnSwapLocations');
    if (!fromEl || !toEl) return;

    // 1. Swap input text values
    const tempVal = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = tempVal;

    // 2. Smoothly rotate button forward another 180 degrees on every tap
    swapRotationAngle += 180;
    if (swapBtn) {
      swapBtn.style.transform = `rotate(${swapRotationAngle}deg)`;
    }

    // 3. Trigger pulse highlight animation on both input bars
    fromEl.classList.remove('location-highlight-pulse');
    toEl.classList.remove('location-highlight-pulse');
    void fromEl.offsetWidth; // Force CSS reflow to restart animation on consecutive clicks
    fromEl.classList.add('location-highlight-pulse');
    toEl.classList.add('location-highlight-pulse');

    // 4. Update internal state, clear buttons visibility & booking button state
    state.fromLocation = fromEl.value;
    state.toLocation = toEl.value;
    updateLocationClearButtons();
    updateBookingButtonState();

    showToast('Swapped pick-up & destination', '⇅');
  };

  btnSwapLocations?.addEventListener('click', (e) => {
    window.handleSwapLocations(e);
  });

  // Clear Pick-up Location Quick Action
  btnClearFromLoc?.addEventListener('click', () => {
    if (inputFromLoc) {
      inputFromLoc.value = '';
      inputFromLoc.focus();
      state.fromLocation = '';
      updateLocationClearButtons();
      updateBookingButtonState();
      showToast('Pick-up location cleared', '✕');
    }
  });

  // Clear Destination Quick Action
  btnClearToLoc?.addEventListener('click', () => {
    if (inputToLoc) {
      inputToLoc.value = '';
      inputToLoc.focus();
      state.toLocation = '';
      updateLocationClearButtons();
      updateBookingButtonState();
      showToast('Destination cleared', '✕');
    }
  });

  // Clear Airport Car Pick-up Point Quick Action
  btnClearAirportCarPickup?.addEventListener('click', () => {
    if (inputAirportCarPickup) {
      inputAirportCarPickup.value = '';
      inputAirportCarPickup.focus();
      updateLocationClearButtons();
      updateBookingButtonState();
      showToast('Car pick-up point cleared', '✕');
    }
  });

  // Clear Airport Terminal Quick Action
  btnClearAirportTerminal?.addEventListener('click', () => {
    if (inputAirportTerminal) {
      inputAirportTerminal.value = '';
      inputAirportTerminal.focus();
      updateLocationClearButtons();
      updateBookingButtonState();
      showToast('Airport terminal cleared', '✕');
    }
  });

  // Clear Airport Destination Quick Action
  btnClearAirportDest?.addEventListener('click', () => {
    if (inputAirportDest) {
      inputAirportDest.value = '';
      inputAirportDest.focus();
      updateLocationClearButtons();
      updateBookingButtonState();
      showToast('Destination cleared', '✕');
    }
  });

  // Pick-up Date & Time Module Logic
  let pickupDateTimeMode = 'now'; // 'now' | 'schedule'

  function initPickupDateTime() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    let hrs = today.getHours();
    let mins = today.getMinutes() + 15;
    if (mins >= 60) {
      hrs = (hrs + 1) % 24;
      mins = mins % 60;
    }
    const defaultTimeStr = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    if (inputPickupDate) {
      inputPickupDate.min = todayStr;
      inputPickupDate.value = todayStr;
    }
    if (inputPickupTime) {
      inputPickupTime.value = defaultTimeStr;
    }
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return 'Select Date';
    const [y, m, d] = dateStr.split('-').map(Number);
    const chosen = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    chosen.setHours(0, 0, 0, 0);

    const diffDays = Math.round((chosen - today) / (1000 * 60 * 60 * 24));
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateFormatted = `${String(d).padStart(2, '0')} ${monthNames[m - 1]}`;

    if (diffDays === 0) return `Today, ${dateFormatted}`;
    if (diffDays === 1) return `Tomorrow, ${dateFormatted}`;
    return dateFormatted;
  }

  function formatDisplayTime(timeStr) {
    if (!timeStr) return 'Select Time';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
  }

  btnDtNow?.addEventListener('click', () => {
    pickupDateTimeMode = 'now';
    btnDtNow.classList.add('active');
    btnDtSchedule?.classList.remove('active');
    if (dispPickupDate) {
      const today = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      dispPickupDate.textContent = `Today, ${String(today.getDate()).padStart(2, '0')} ${monthNames[today.getMonth()]}`;
    }
    if (dispPickupTime) dispPickupTime.textContent = 'Immediate (6 min)';
    showToast('Chauffeur scheduled to arrive now (6 mins)', '⚡');
  });

  btnDtSchedule?.addEventListener('click', () => {
    pickupDateTimeMode = 'schedule';
    btnDtSchedule.classList.add('active');
    btnDtNow?.classList.remove('active');
    
    // Auto-update display to current chosen date/time
    if (inputPickupDate && dispPickupDate) {
      dispPickupDate.textContent = formatDisplayDate(inputPickupDate.value);
    }
    if (inputPickupTime && dispPickupTime) {
      dispPickupTime.textContent = formatDisplayTime(inputPickupTime.value);
    }
    showToast('Select your scheduled pick-up date & time', '📅');
    
    // Proactively open date picker if supported
    try {
      if (inputPickupDate && typeof inputPickupDate.showPicker === 'function') {
        inputPickupDate.showPicker();
      }
    } catch (_) {}
  });

  inputPickupDate?.addEventListener('change', (e) => {
    pickupDateTimeMode = 'schedule';
    btnDtSchedule?.classList.add('active');
    btnDtNow?.classList.remove('active');
    if (dispPickupDate) {
      dispPickupDate.textContent = formatDisplayDate(e.target.value);
    }
  });

  inputPickupTime?.addEventListener('change', (e) => {
    pickupDateTimeMode = 'schedule';
    btnDtSchedule?.classList.add('active');
    btnDtNow?.classList.remove('active');
    if (dispPickupTime) {
      dispPickupTime.textContent = formatDisplayTime(e.target.value);
    }
  });

  initPickupDateTime();

  // Dynamic Validation for Book Chauffeur Button (Gray & Disabled when details not entered)
  function updateBookingButtonState() {
    if (!btnBookChauffeur) return;

    let isReady = false;
    const category = state.activeCategory || 'hourly';

    if (category === 'airport') {
      const carPickupVal = inputAirportCarPickup ? inputAirportCarPickup.value.trim() : '';
      const destVal = inputAirportDest ? inputAirportDest.value.trim() : '';
      isReady = carPickupVal.length > 0 && destVal.length > 0;
    } else {
      const fromVal = inputFromLoc ? inputFromLoc.value.trim() : '';
      const toVal = inputToLoc ? inputToLoc.value.trim() : '';
      isReady = fromVal.length > 0 && toVal.length > 0;
    }

    const subText = btnBookChauffeur.querySelector('.btn-secondary-text');

    if (isReady) {
      btnBookChauffeur.classList.remove('disabled');
      btnBookChauffeur.removeAttribute('disabled');
      btnBookChauffeur.setAttribute('aria-disabled', 'false');
      if (subText) subText.textContent = 'Nearest in 6 mins';
    } else {
      btnBookChauffeur.classList.add('disabled');
      btnBookChauffeur.setAttribute('disabled', 'disabled');
      btnBookChauffeur.setAttribute('aria-disabled', 'true');
      if (subText) {
        if (category === 'airport') {
          const carPickupVal = inputAirportCarPickup ? inputAirportCarPickup.value.trim() : '';
          const destVal = inputAirportDest ? inputAirportDest.value.trim() : '';
          if (!carPickupVal && !destVal) {
            subText.textContent = 'Enter car pickup & destination';
          } else if (!carPickupVal) {
            subText.textContent = 'Enter car pick-up point';
          } else {
            subText.textContent = 'Enter destination (last stop)';
          }
        } else {
          const fromVal = inputFromLoc ? inputFromLoc.value.trim() : '';
          const toVal = inputToLoc ? inputToLoc.value.trim() : '';
          if (!fromVal && !toVal) {
            subText.textContent = 'Enter pickup & destination';
          } else if (!toVal) {
            subText.textContent = 'Enter destination';
          } else {
            subText.textContent = 'Enter pickup location';
          }
        }
      }
    }
  }

  // Live input watchers to toggle button state and clear icons dynamically
  function onFromLocationInput() {
    updateLocationClearButtons();
    updateBookingButtonState();
  }

  function onToLocationInput() {
    updateLocationClearButtons();
    updateBookingButtonState();
  }

  function onAirportLocationInput() {
    updateLocationClearButtons();
    updateBookingButtonState();
  }

  inputFromLoc?.addEventListener('input', onFromLocationInput);
  inputFromLoc?.addEventListener('change', onFromLocationInput);
  inputToLoc?.addEventListener('input', onToLocationInput);
  inputToLoc?.addEventListener('change', onToLocationInput);
  inputAirportCarPickup?.addEventListener('input', onAirportLocationInput);
  inputAirportCarPickup?.addEventListener('change', onAirportLocationInput);
  inputAirportTerminal?.addEventListener('input', onAirportLocationInput);
  inputAirportTerminal?.addEventListener('change', onAirportLocationInput);
  inputAirportDest?.addEventListener('input', onAirportLocationInput);
  inputAirportDest?.addEventListener('change', onAirportLocationInput);

  // Initial sync of clear buttons and button state
  updateLocationClearButtons();
  updateBookingButtonState();

  // Special Trip Occasion Chips Click Handler
  occasionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      occasionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cause = chip.querySelector('span:last-child').textContent;
      showToast(`Selected occasion: ${cause}`, '✨');
    });
  });

  // Airport Direction Toggle with contextual label updates
  airportDirChips.forEach(chip => {
    chip.addEventListener('click', () => {
      airportDirChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const dir = chip.dataset.dir;
      state.airportDirection = dir;

      if (dir === 'pickup') {
        if (lblAirportTerminal) lblAirportTerminal.textContent = 'AIRPORT TERMINAL (PICK-UP)';
        if (inputAirportTerminal) inputAirportTerminal.value = 'Kempegowda Int\'l Terminal 2 (Arrivals Gate 4)';
        if (lblAirportDest) lblAirportDest.textContent = 'DESTINATION (LAST STOP)';
        if (inputAirportDest) inputAirportDest.value = 'Indiranagar 100ft Road, Bengaluru';
        showToast('Chauffeur meets you at Airport Arrivals Gate', '🛬');
      } else {
        if (lblAirportTerminal) lblAirportTerminal.textContent = 'AIRPORT TERMINAL (DROP-OFF)';
        if (inputAirportTerminal) inputAirportTerminal.value = 'Kempegowda Int\'l Terminal 2 (Departures Ramp)';
        if (lblAirportDest) lblAirportDest.textContent = 'DESTINATION (LAST STOP)';
        if (inputAirportDest) inputAirportDest.value = 'Kempegowda Int\'l Airport T2';
        showToast('Chauffeur drives your car to Airport Departures', '🛫');
      }
      updateLocationClearButtons();
      updateBookingButtonState();
    });
  });

  // Flight Number Live Detection
  inputFlightNo?.addEventListener('input', (e) => {
    const val = e.target.value.trim().toUpperCase();
    if (val.startsWith('6E')) {
      airlineTag.textContent = 'IndiGo • T2';
      flightStatusPill.textContent = 'On Schedule';
    } else if (val.startsWith('AI')) {
      airlineTag.textContent = 'Air India • T1';
      flightStatusPill.textContent = 'Radar Tracking';
    } else if (val.startsWith('UK')) {
      airlineTag.textContent = 'Vistara • T2';
      flightStatusPill.textContent = 'On Time';
    } else if (val.startsWith('EK')) {
      airlineTag.textContent = 'Emirates • Intl';
      flightStatusPill.textContent = 'Landing in 45m';
    } else {
      airlineTag.textContent = 'Auto Detect';
      flightStatusPill.textContent = 'Radar Sync Live';
    }
  });

  // Chauffeur Reaching Time Change Handler
  const selectDriverReachTime = document.getElementById('selectDriverReachTime');
  const lblReachBufferHint = document.getElementById('lblReachBufferHint');
  selectDriverReachTime?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (lblReachBufferHint) {
      if (val === 'before15') {
        lblReachBufferHint.textContent = '15 min before';
        showToast('Chauffeur reaching 15 min before landing', '⏱️');
      } else if (val === 'before30') {
        lblReachBufferHint.textContent = '30 min before';
        showToast('Chauffeur reaching 30 min before landing', '⏱️');
      } else if (val === 'before45') {
        lblReachBufferHint.textContent = '45 min before';
        showToast('Chauffeur reaching 45 min before landing', '⏱️');
      } else if (val === 'landing') {
        lblReachBufferHint.textContent = 'At touchdown';
        showToast('Chauffeur waiting at flight touchdown', '⏱️');
      } else {
        lblReachBufferHint.textContent = 'Curbside ready';
      }
    }
  });

  // Car Type Selection (Sedan, Hatchback, SUV, Luxury)
  const carTypeNames = {
    sedan: 'Sedan (Dzire / City / C-Class)',
    hatchback: 'Hatchback (Swift / i20 / Baleno)',
    suv: 'SUV / MUV (Creta / Fortuner / Innova)',
    luxury: 'Luxury (BMW / Merc S / Audi)'
  };

  carTypeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      carTypeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const carType = chip.dataset.cartype || 'sedan';
      state.selectedCarType = carType;

      if (dispSelectedCarTypeBadge) {
        dispSelectedCarTypeBadge.textContent = carTypeNames[carType] || 'Sedan';
      }

      // Contextual feedback toast
      const typeDisplayTitle = chip.querySelector('.ct-name')?.textContent || carType;
      showToast(`Selected car type: ${typeDisplayTitle}`, '🚗');

      updateFareCalculation();
      updateBookingButtonState();
    });
  });

  // Duration Presets (2h, 4h, 6h, 8h)
  durationPresetList.forEach(chip => {
    chip.addEventListener('click', () => {
      durationPresetList.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const hours = parseInt(chip.dataset.hours, 10);
      state.selectedHours = hours;
      dispDurationValue.textContent = `${hours} Hours`;
      updateFareCalculation();
    });
  });

  // ==========================================
  // 8. TRIPS PAGE: FILTER TABS
  // ==========================================
  const tripFilterPills = document.querySelectorAll('.trip-filter-pill');
  const tripFullCards = document.querySelectorAll('.trip-full-card');

  tripFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tripFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      tripFullCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 8B. 1-TAP REPEAT RECENT TRIPS (HOME & TRIPS PAGE)
  // ==========================================
  function initRepeatTripButtons() {
    const repeatButtons = document.querySelectorAll('.btn-repeat-trip');
    repeatButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        const tripItem = btn.closest('.recent-trip-item') || btn.closest('.trip-full-card');
        const from = tripItem?.dataset.from;
        const to = tripItem?.dataset.to;
        const cat = tripItem?.dataset.cat || 'hourly';
        const car = tripItem?.dataset.car || 'sedan';
        const name = tripItem?.dataset.name || 'Trip';

        // 1. Switch to Home page if not already there
        if (state.activeNavPage !== 'home') {
          switchNavbarPage('home');
        }

        // 2. Select category tab
        const targetCatTab = document.querySelector(`.cat-tab[data-category="${cat}"]`);
        if (targetCatTab) {
          targetCatTab.click();
        }

        // 3. Populate locations
        if (cat === 'airport') {
          if (inputAirportCarPickup && from) inputAirportCarPickup.value = from;
          if (inputAirportDest && to) inputAirportDest.value = to;
        } else {
          if (inputFromLoc && from) inputFromLoc.value = from;
          if (inputToLoc && to) inputToLoc.value = to;
        }

        // 4. Select matching car type
        const targetCarChip = document.querySelector(`.car-type-chip[data-cartype="${car}"]`);
        if (targetCarChip) {
          targetCarChip.click();
        }

        // 5. Update UI states
        updateLocationClearButtons();
        updateBookingButtonState();
        updateFareCalculation();

        // 6. Smooth scroll to booking orchestrator card
        const bookingCard = document.querySelector('.booking-orchestrator-card');
        if (bookingCard) {
          bookingCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        showToast(`Loaded trip: ${name}`, '⚡');
      });
    });
  }
  initRepeatTripButtons();

  // Manage upcoming trip button
  document.getElementById('btnManageUpcoming')?.addEventListener('click', () => {
    showToast('Flight 6E 204 is on time. Chauffeur arriving at 05:45 AM.', '✈️');
  });



  // ==========================================
  // 9. QUICK REBOOK HUB ACTIONS
  // ==========================================
  document.querySelectorAll('.rebook-action-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const tile = trigger.closest('.quick-rebook-tile');
      const title = tile.querySelector('.rebook-title').textContent;
      showToast(`1-Tap Rebooked: ${title}`, '⚡');
      setTimeout(() => switchScreen('booking'), 650);
    });
  });

  // ==========================================
  // 10. CHAUFFEURS DIRECTORY: FILTERS & SELECTION
  // ==========================================
  const chFilters = document.querySelectorAll('.ch-filter');
  const chauffeurCards = document.querySelectorAll('.chauffeur-directory-card');

  chFilters.forEach(ch => {
    ch.addEventListener('click', () => {
      chFilters.forEach(c => c.classList.remove('active'));
      ch.classList.add('active');

      const filter = ch.dataset.filter;
      chauffeurCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  document.querySelectorAll('.btn-select-driver').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const driverName = btn.dataset.driverName;
      showToast(`Selected ${driverName} for your car`, '✓');
      setTimeout(() => switchScreen('booking'), 600);
    });
  });

  // ==========================================
  // 11. GARAGE PAGE & VEHICLE SELECTION
  // ==========================================
  const garageCarItems = document.querySelectorAll('.garage-car-item');

  garageCarItems.forEach(item => {
    item.addEventListener('click', () => {
      garageCarItems.forEach(i => {
        i.classList.remove('active');
        const badge = i.querySelector('.car-active-indicator');
        if (badge) badge.remove();
      });

      item.classList.add('active');
      const activeBadge = document.createElement('div');
      activeBadge.className = 'car-active-indicator';
      activeBadge.textContent = 'ACTIVE ON APP';
      item.prepend(activeBadge);

      const carName = item.dataset.car;
      state.selectedCar.make = carName;
      carModelLabel.textContent = carName;

      showToast(`Switched active vehicle to ${carName}`, '🚗');
    });
  });

  document.getElementById('btnAddNewCarModal')?.addEventListener('click', () => {
    showToast('Vehicle registration document scanner active', '📷');
  });

  // Switch Vehicle quick drawer on Home
  btnChangeCar?.addEventListener('click', () => {
    garageDrawer.classList.remove('hidden');
  });

  btnCloseGarage?.addEventListener('click', () => {
    garageDrawer.classList.add('hidden');
  });

  garageDrawer?.addEventListener('click', (e) => {
    if (e.target === garageDrawer) {
      garageDrawer.classList.add('hidden');
    }
  });

  carChoiceCards.forEach(card => {
    card.addEventListener('click', () => {
      carChoiceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const carName = card.dataset.carName;
      const carSpec = card.dataset.carSpec;

      state.selectedCar.make = carName;
      state.selectedCar.spec = carSpec;

      carModelLabel.textContent = carName;
      carTypeLabel.textContent = carSpec;

      showToast(`Selected ${carName} for this ride`, '🚗');
      setTimeout(() => garageDrawer.classList.add('hidden'), 250);
    });
  });

  // ==========================================
  // 12. ADVANCED DRIVER APP SIMULATION & BOOKING LIFECYCLE
  // ==========================================
  // Available driver partner pool for demo acceptance
  const driverPartnerPool = [
    {
      name: 'Vikram Singh',
      avatar: 'VS',
      rating: '★ 4.99 Top 1%',
      exp: '7 Yrs Exp',
      sub: 'Certified for Mercedes-Benz & Luxury Automatics'
    },
    {
      name: 'Ramesh Nair',
      avatar: 'RN',
      rating: '★ 4.95 Certified',
      exp: '9 Yrs Exp',
      sub: 'Specialist for Automatic SUVs & Sedans'
    },
    {
      name: 'Mohammed Rizwan',
      avatar: 'MR',
      rating: '★ 4.97 Premier',
      exp: '6 Yrs Exp',
      sub: 'Certified Chauffeur • Fluent in English'
    }
  ];

  let currentAcceptedDriver = null;
  let driverSimTimer = null;
  let searchCountdownInterval = null;

  // DOM elements for Booking & Driver Simulation
  const panelBookingSearching = document.getElementById('panelBookingSearching');
  const panelBookingConfirmed = document.getElementById('panelBookingConfirmed');
  const liveStatusBadgeText = document.getElementById('liveStatusBadgeText');
  const searchFromDisp = document.getElementById('searchFromDisp');
  const searchToDisp = document.getElementById('searchToDisp');
  const searchCarTypeDisp = document.getElementById('searchCarTypeDisp');
  const btnCancelSearching = document.getElementById('btnCancelSearching');

  const driverAppDemoModal = document.getElementById('driverAppDemoModal');
  const driverSimStateRequest = document.getElementById('driverSimStateRequest');
  const driverSimStateActive = document.getElementById('driverSimStateActive');
  const driverSimFare = document.getElementById('driverSimFare');
  const driverSimCategory = document.getElementById('driverSimCategory');
  const driverSimPickup = document.getElementById('driverSimPickup');
  const driverSimDrop = document.getElementById('driverSimDrop');
  const driverSimCar = document.getElementById('driverSimCar');
  const driverAcceptCountdown = document.getElementById('driverAcceptCountdown');
  const btnDriverAcceptJob = document.getElementById('btnDriverAcceptJob');
  const btnDriverArrived = document.getElementById('btnDriverArrived');
  const btnDriverStartTrip = document.getElementById('btnDriverStartTrip');
  const btnCloseDriverSim = document.getElementById('btnCloseDriverSim');
  const driverStepGuide = document.getElementById('driverStepGuide');
  const simDriverMiniName = document.getElementById('simDriverMiniName');
  const simDriverMiniAvatar = document.getElementById('simDriverMiniAvatar');

  // Customer view driver elements
  const assignedDriverAvatar = document.getElementById('assignedDriverAvatar');
  const assignedDriverName = document.getElementById('assignedDriverName');
  const assignedDriverBadge = document.getElementById('assignedDriverBadge');
  const assignedDriverSub = document.getElementById('assignedDriverSub');
  const assignedDriverExp = document.getElementById('assignedDriverExp');
  const driverBlipBadge = document.getElementById('driverBlipBadge');
  const assignedVehicleText = document.getElementById('assignedVehicleText');

  // Status timeline elements
  const stepBookingConfirmed = document.getElementById('stepBookingConfirmed');
  const stepDriverArriving = document.getElementById('stepDriverArriving');
  const descDriverArriving = document.getElementById('descDriverArriving');
  const markerDriverArriving = document.getElementById('markerDriverArriving');
  const stepTripStarted = document.getElementById('stepTripStarted');
  const descTripStarted = document.getElementById('descTripStarted');
  const markerTripStarted = document.getElementById('markerTripStarted');

  // 1. User clicks "Book Chauffeur": DOES NOT confirm booking directly!
  // Instead: sends request to driver app & shows Searching screen (no driver details shown yet)
  btnBookChauffeur?.addEventListener('click', (e) => {
    if (btnBookChauffeur.classList.contains('disabled') || btnBookChauffeur.hasAttribute('disabled')) {
      e.preventDefault();
      e.stopPropagation();
      showToast('Please enter pickup and destination details', '⚠️');
      return;
    }

    let fromText = '';
    let toText = '';
    if (state.activeCategory === 'airport') {
      const carPick = inputAirportCarPickup?.value.trim() || 'Car Pick-up Point';
      const term = inputAirportTerminal?.value.trim() || 'BLR Airport';
      fromText = `${carPick} → ${term}`;
      toText = inputAirportDest?.value.trim() || 'Indiranagar 100ft Road';
    } else {
      fromText = inputFromLoc?.value.trim() || 'Current Location';
      toText = inputToLoc?.value.trim() || 'Selected Destination';
    }
    const carType = state.selectedCarType || 'sedan';
    const carCapitalized = carType.charAt(0).toUpperCase() + carType.slice(1);
    const fareVal = dispFareAmount?.textContent || '596';

    // Populate search details
    if (searchFromDisp) searchFromDisp.textContent = fromText;
    if (searchToDisp) searchToDisp.textContent = toText;
    if (searchCarTypeDisp) searchCarTypeDisp.textContent = `${carCapitalized} (Customer's Car)`;

    // Reset Booking Screen to State A: SEARCHING
    panelBookingSearching?.classList.remove('hidden');
    panelBookingConfirmed?.classList.add('hidden');
    if (liveStatusBadgeText) liveStatusBadgeText.textContent = 'Sending Request to Drivers...';

    // Populate Driver Partner App Simulator data
    if (driverSimFare) driverSimFare.textContent = `₹${fareVal}`;
    if (driverSimCategory) {
      if (state.activeCategory === 'day') {
        driverSimCategory.textContent = 'Full Day • Max 10 hrs Flat';
      } else if (state.activeCategory === 'airport') {
        driverSimCategory.textContent = 'BLR Airport Concierge Drop';
      } else if (state.activeCategory === 'special') {
        driverSimCategory.textContent = 'Outstation / Event 12h Flat';
      } else {
        driverSimCategory.textContent = `Hourly • ${state.selectedHours} Hours`;
      }
    }
    if (driverSimPickup) driverSimPickup.textContent = fromText;
    if (driverSimDrop) driverSimDrop.textContent = toText;
    if (driverSimCar) driverSimCar.textContent = `Vehicle: ${carCapitalized} (Customer's Personal Car)`;

    // Switch to booking screen
    switchScreen('booking');
    showToast('Trip broadcasted to nearby driver partner app...', '📡');

    // Pop up the Driver Partner App Simulation Modal after a realistic 1.2s delay
    clearTimeout(driverSimTimer);
    driverSimTimer = setTimeout(() => {
      openDriverAppSimulator();
    }, 1200);
  });

  function openDriverAppSimulator() {
    if (!driverAppDemoModal) return;
    driverAppDemoModal.classList.remove('hidden');
    driverSimStateRequest?.classList.remove('hidden');
    driverSimStateActive?.classList.add('hidden');

    let countdown = 15;
    if (driverAcceptCountdown) driverAcceptCountdown.textContent = `${countdown}s`;
    clearInterval(searchCountdownInterval);
    searchCountdownInterval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(searchCountdownInterval);
        if (driverAcceptCountdown) driverAcceptCountdown.textContent = 'Expiring...';
      } else {
        if (driverAcceptCountdown) driverAcceptCountdown.textContent = `${countdown}s`;
      }
    }, 1000);
  }

  // 2. Driver Partner accepts the job on the Driver App
  btnDriverAcceptJob?.addEventListener('click', () => {
    clearInterval(searchCountdownInterval);
    // Pick an active driver partner (defaults to Vikram Singh or random from pool)
    const randomDriver = driverPartnerPool[Math.floor(Math.random() * driverPartnerPool.length)];
    currentAcceptedDriver = randomDriver;

    // Transition Driver Partner simulator state to Active Trip Control
    driverSimStateRequest?.classList.add('hidden');
    driverSimStateActive?.classList.remove('hidden');
    if (simDriverMiniName) simDriverMiniName.textContent = `${randomDriver.name} (Partner)`;
    if (simDriverMiniAvatar) simDriverMiniAvatar.textContent = randomDriver.avatar;
    if (driverStepGuide) driverStepGuide.textContent = `Chauffeur is navigating to customer's location at ${inputFromLoc?.value || 'pickup point'}.`;

    // Reset Driver Stepper buttons
    if (btnDriverArrived) {
      btnDriverArrived.classList.remove('disabled', 'completed');
      btnDriverArrived.removeAttribute('disabled');
    }
    if (btnDriverStartTrip) {
      btnDriverStartTrip.classList.add('disabled');
      btnDriverStartTrip.setAttribute('disabled', 'disabled');
      btnDriverStartTrip.classList.remove('completed');
    }

    // UPDATE USER APP: Booking status changes to Driver Booking Confirmed!
    panelBookingSearching?.classList.add('hidden');
    panelBookingConfirmed?.classList.remove('hidden');

    // Populate the ACCEPTED driver's details (only visible now that driver accepted!)
    if (assignedDriverAvatar) assignedDriverAvatar.textContent = randomDriver.avatar;
    if (assignedDriverName) assignedDriverName.textContent = randomDriver.name;
    if (assignedDriverBadge) assignedDriverBadge.textContent = randomDriver.rating;
    if (assignedDriverSub) assignedDriverSub.textContent = randomDriver.sub;
    if (assignedDriverExp) assignedDriverExp.textContent = randomDriver.exp;
    if (driverBlipBadge) driverBlipBadge.textContent = 'Arriving in 4 min';

    const carType = state.selectedCarType || 'sedan';
    const carCapitalized = carType.charAt(0).toUpperCase() + carType.slice(1);
    if (assignedVehicleText) {
      assignedVehicleText.innerHTML = `Assigned to drive: <strong>Your ${carCapitalized} (${state.selectedCar.regNo || 'KA 01 MJ 4402'})</strong>`;
    }

    // Step 1: Confirmed & Arriving status
    if (liveStatusBadgeText) liveStatusBadgeText.textContent = `Booking Confirmed • ${randomDriver.name}`;
    stepBookingConfirmed?.classList.add('completed');
    stepDriverArriving?.classList.remove('completed', 'pending');
    stepDriverArriving?.classList.add('current');
    if (markerDriverArriving) markerDriverArriving.textContent = '2';
    if (descDriverArriving) descDriverArriving.textContent = 'Arriving at your doorstep in 4 mins';

    stepTripStarted?.classList.remove('current', 'completed');
    stepTripStarted?.classList.add('pending');
    if (markerTripStarted) markerTripStarted.textContent = '3';
    if (descTripStarted) descTripStarted.textContent = 'Trip Started • Chauffeur driving your car';

    showToast(`Driver ${randomDriver.name} accepted your request!`, '✓');
    syncTrackTripState('confirmed', randomDriver);

    // Auto-minimize simulator after 1.4s so customer can see the confirmed booking sheet
    setTimeout(() => {
      driverAppDemoModal?.classList.add('hidden');
    }, 1400);
  });

  // 3. Driver App simulation Step 1: Driver sets "Arrived at Location"
  btnDriverArrived?.addEventListener('click', () => {
    btnDriverArrived.classList.add('completed');
    btnDriverArrived.setAttribute('disabled', 'disabled');

    // Enable Step 2 in driver app
    if (btnDriverStartTrip) {
      btnDriverStartTrip.classList.remove('disabled');
      btnDriverStartTrip.removeAttribute('disabled');
    }
    if (driverStepGuide) {
      driverStepGuide.textContent = 'Driver arrived at customer location! Ask customer for 4-digit OTP to start trip.';
    }

    // Update Customer Screen
    if (liveStatusBadgeText) liveStatusBadgeText.textContent = 'Chauffeur Arrived at Location';
    if (driverBlipBadge) driverBlipBadge.textContent = 'Arrived at Doorstep';
    if (markerDriverArriving) markerDriverArriving.textContent = '✓';
    stepDriverArriving?.classList.remove('current');
    stepDriverArriving?.classList.add('completed');
    if (descDriverArriving) descDriverArriving.textContent = 'Chauffeur has arrived at your pick-up location';

    stepTripStarted?.classList.remove('pending');
    stepTripStarted?.classList.add('current');

    showToast('Chauffeur has arrived at your location!', '📍');
    syncTrackTripState('arrived', currentAcceptedDriver);

    // Auto minimize simulator after 1.2s
    setTimeout(() => {
      driverAppDemoModal?.classList.add('hidden');
    }, 1200);
  });

  // 4. Driver App simulation Step 2: Driver sets "Start Trip"
  btnDriverStartTrip?.addEventListener('click', () => {
    btnDriverStartTrip.classList.add('completed');
    btnDriverStartTrip.setAttribute('disabled', 'disabled');
    if (driverStepGuide) {
      driverStepGuide.textContent = 'Trip active in progress! Chauffeur is safely driving customer\'s vehicle.';
    }

    // Update Customer Screen to TRIP STARTED
    if (liveStatusBadgeText) liveStatusBadgeText.textContent = 'Trip Started • On The Way';
    if (driverBlipBadge) driverBlipBadge.textContent = 'Trip In Progress';

    if (markerTripStarted) markerTripStarted.textContent = '✓';
    stepTripStarted?.classList.remove('pending');
    stepTripStarted?.classList.add('completed');
    if (descTripStarted) descTripStarted.textContent = 'Trip Started • Chauffeur is safely driving your car';

    showToast('OTP verified! Trip started successfully.', '🚀');
    syncTrackTripState('started', currentAcceptedDriver);

    // Auto minimize simulator after 1.2s
    setTimeout(() => {
      driverAppDemoModal?.classList.add('hidden');
    }, 1200);
  });

  // Simulator Modal Close / Minimize
  btnCloseDriverSim?.addEventListener('click', () => {
    driverAppDemoModal?.classList.add('hidden');
  });

  // Floating trigger button to reopen simulator at any time during demo
  document.querySelector('.driver-demo-trigger-banner')?.addEventListener('click', () => {
    driverAppDemoModal?.classList.remove('hidden');
  });

  // Cancel Request / Cancel Booking
  function cancelChauffeurBooking() {
    clearTimeout(driverSimTimer);
    clearInterval(searchCountdownInterval);
    driverAppDemoModal?.classList.add('hidden');
    showToast('Chauffeur request cancelled', '✕');
    syncTrackTripState('cancelled');
    switchScreen('main');
  }

  btnCancelSearching?.addEventListener('click', cancelChauffeurBooking);
  btnCancelBooking?.addEventListener('click', cancelChauffeurBooking);

  btnCloseBooking?.addEventListener('click', () => {
    switchScreen('main');
  });

  btnShareTrip?.addEventListener('click', () => {
    showToast('Live Ride Tracking Link copied to clipboard! Share with family.', '🔗');
  });

  document.getElementById('btnCallAcceptedDriver')?.addEventListener('click', () => {
    const name = currentAcceptedDriver?.name || 'Vikram Singh';
    showToast(`Calling chauffeur ${name}...`, '📞');
  });

  document.getElementById('btnChatAcceptedDriver')?.addEventListener('click', () => {
    const name = currentAcceptedDriver?.name || 'Vikram Singh';
    showToast(`Opening chat with ${name}...`, '💬');
  });

  // ==========================================
  // 12B. TRACK PAGE: GPS RADAR & HALF-POPUP BOTTOM SHEET
  // ==========================================
  const trackBottomSheet = document.getElementById('trackBottomSheet');
  const trackSheetDragHandle = document.getElementById('trackSheetDragHandle');
  const trackMinimizedPeekBar = document.getElementById('trackMinimizedPeekBar');
  const btnExpandSheet = document.getElementById('btnExpandSheet');
  const txtExpandBtn = document.getElementById('txtExpandBtn');
  const peekDriverAvatar = document.getElementById('peekDriverAvatar');
  const peekDriverName = document.getElementById('peekDriverName');
  const peekStatusSub = document.getElementById('peekStatusSub');
  const peekDotPulse = document.getElementById('peekDotPulse');

  const chipModeActiveTrip = document.getElementById('chipModeActiveTrip');
  const chipModeNoTrip = document.getElementById('chipModeNoTrip');
  const trackSheetActiveState = document.getElementById('trackSheetActiveState');
  const trackSheetEmptyState = document.getElementById('trackSheetEmptyState');
  const btnTrackNow = document.getElementById('btnTrackNow');
  const btnTrackBookChauffeur = document.getElementById('btnTrackBookChauffeur');
  const btnRecenterMap = document.getElementById('btnRecenterMap');
  const btnToggleTraffic = document.getElementById('btnToggleTraffic');
  const btnTrackCallDriver = document.getElementById('btnTrackCallDriver');
  const btnTrackChatDriver = document.getElementById('btnTrackChatDriver');

  const trackDriverAvatar = document.getElementById('trackDriverAvatar');
  const trackDriverName = document.getElementById('trackDriverName');
  const trackDriverRating = document.getElementById('trackDriverRating');
  const trackAssignedCar = document.getElementById('trackAssignedCar');
  const trackDriverBadge = document.getElementById('trackDriverBadge');
  const trackStatusTitle = document.getElementById('trackStatusTitle');
  const trackEtaPill = document.getElementById('trackEtaPill');
  const trackPickupDisp = document.getElementById('trackPickupDisp');
  const trackDropDisp = document.getElementById('trackDropDisp');
  const trackDistanceDisp = document.getElementById('trackDistanceDisp');
  const trackSpeedDisp = document.getElementById('trackSpeedDisp');
  const trackFareDisp = document.getElementById('trackFareDisp');
  const mapFloatingEta = document.getElementById('mapFloatingEta');
  const mapFloatingEtaTime = document.getElementById('mapFloatingEtaTime');
  const mapFloatingEtaSub = document.getElementById('mapFloatingEtaSub');
  const mapStatusIndicator = document.getElementById('mapStatusIndicator');
  const trackChauffeurMarker = document.getElementById('trackChauffeurMarker');
  const trackLiveRoutePath = document.getElementById('trackLiveRoutePath');
  const trackMapViewport = document.getElementById('trackMapViewport');
  const trackMapCanvas = document.getElementById('trackMapCanvas');

  function minimizeBottomSheet() {
    trackBottomSheet?.classList.add('minimized');
  }

  function expandBottomSheet() {
    trackBottomSheet?.classList.remove('minimized');
  }

  function toggleBottomSheet() {
    if (trackBottomSheet?.classList.contains('minimized')) {
      expandBottomSheet();
    } else {
      minimizeBottomSheet();
    }
  }

  // Tapping drag handle toggles sheet
  trackSheetDragHandle?.addEventListener('click', toggleBottomSheet);
  // Tapping minimized peek bar expands sheet back to full
  trackMinimizedPeekBar?.addEventListener('click', () => {
    expandBottomSheet();
  });

  // Touch & Pointer Drag Gestures to drag the bar and pull sheet up/down
  let dragStartY = 0;
  let isDraggingSheet = false;

  function onDragStart(e) {
    dragStartY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    isDraggingSheet = true;
  }

  function onDragMove(e) {
    if (!isDraggingSheet) return;
    const currentY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const deltaY = currentY - dragStartY;
    if (deltaY > 28) {
      // Dragged downwards -> minimize
      minimizeBottomSheet();
      isDraggingSheet = false;
    } else if (deltaY < -28) {
      // Dragged upwards -> expand
      expandBottomSheet();
      isDraggingSheet = false;
    }
  }

  function onDragEnd() {
    isDraggingSheet = false;
  }

  trackSheetDragHandle?.addEventListener('pointerdown', onDragStart);
  trackMinimizedPeekBar?.addEventListener('pointerdown', onDragStart);
  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragEnd);

  // ==========================================
  // FREE MAP DRAGGING & PANNING ENGINE
  // ==========================================
  let mapPanX = 0;
  let mapPanY = 0;
  let mapDragStartX = 0;
  let mapDragStartY = 0;
  let mapPanStartOffsetX = 0;
  let mapPanStartOffsetY = 0;
  let isPanningMap = false;

  const MAP_BOUNDS = {
    minX: -450,
    maxX: 450,
    minY: -480,
    maxY: 480
  };

  function updateRecenterButtonState() {
    if (!btnRecenterMap) return;
    const isPannedFar = Math.abs(mapPanX) > 20 || Math.abs(mapPanY) > 20;
    if (isPannedFar) {
      btnRecenterMap.classList.add('map-hud-btn-active');
    } else {
      btnRecenterMap.classList.remove('map-hud-btn-active');
    }
  }

  function applyMapTransform(x, y, animate = false) {
    if (!trackMapCanvas) return;
    if (animate) {
      trackMapCanvas.classList.remove('is-panning');
      trackMapCanvas.classList.add('is-animating');
    } else {
      trackMapCanvas.classList.add('is-panning');
      trackMapCanvas.classList.remove('is-animating');
    }
    trackMapCanvas.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  }

  function resetMapToChauffeur(animate = true) {
    mapPanX = 0;
    mapPanY = 0;
    applyMapTransform(0, 0, animate);
    updateRecenterButtonState();

    if (trackChauffeurMarker) {
      trackChauffeurMarker.style.transition = 'transform 0.4s cubic-bezier(0.17, 0.89, 0.32, 1.28)';
      trackChauffeurMarker.style.transform = 'translate(95px, 245px) scale(1.35)';
      setTimeout(() => {
        trackChauffeurMarker.style.transform = 'translate(95px, 245px) scale(1)';
      }, 450);
    }
  }

  if (trackMapViewport) {
    trackMapViewport.addEventListener('pointerdown', (e) => {
      // Don't drag map if tapping on HUD buttons, overlays, or sheet
      if (
        e.target.closest('.map-hud-actions') ||
        e.target.closest('.map-hud-btn') ||
        e.target.closest('.map-status-pill') ||
        e.target.closest('.track-bottom-sheet')
      ) {
        return;
      }

      isPanningMap = true;
      mapDragStartX = e.clientX;
      mapDragStartY = e.clientY;
      mapPanStartOffsetX = mapPanX;
      mapPanStartOffsetY = mapPanY;

      trackMapViewport.classList.add('is-dragging');
      trackMapCanvas?.classList.add('is-panning');
      trackMapCanvas?.classList.remove('is-animating');

      try {
        trackMapViewport.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    trackMapViewport.addEventListener('pointermove', (e) => {
      if (!isPanningMap) return;
      const dx = e.clientX - mapDragStartX;
      const dy = e.clientY - mapDragStartY;

      let rawX = mapPanStartOffsetX + dx;
      let rawY = mapPanStartOffsetY + dy;

      // Soft elastic resistance outside bounds
      if (rawX < MAP_BOUNDS.minX) {
        rawX = MAP_BOUNDS.minX - (MAP_BOUNDS.minX - rawX) * 0.35;
      } else if (rawX > MAP_BOUNDS.maxX) {
        rawX = MAP_BOUNDS.maxX + (rawX - MAP_BOUNDS.maxX) * 0.35;
      }

      if (rawY < MAP_BOUNDS.minY) {
        rawY = MAP_BOUNDS.minY - (MAP_BOUNDS.minY - rawY) * 0.35;
      } else if (rawY > MAP_BOUNDS.maxY) {
        rawY = MAP_BOUNDS.maxY + (rawY - MAP_BOUNDS.maxY) * 0.35;
      }

      mapPanX = rawX;
      mapPanY = rawY;
      applyMapTransform(mapPanX, mapPanY, false);
      updateRecenterButtonState();
    });

    const finishMapPan = (e) => {
      if (!isPanningMap) return;
      isPanningMap = false;
      trackMapViewport.classList.remove('is-dragging');

      try {
        if (e && e.pointerId) trackMapViewport.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // Snap back if beyond hard bounds
      let clampedX = Math.max(MAP_BOUNDS.minX, Math.min(MAP_BOUNDS.maxX, mapPanX));
      let clampedY = Math.max(MAP_BOUNDS.minY, Math.min(MAP_BOUNDS.maxY, mapPanY));

      if (clampedX !== mapPanX || clampedY !== mapPanY) {
        mapPanX = clampedX;
        mapPanY = clampedY;
        applyMapTransform(mapPanX, mapPanY, true);
      } else {
        trackMapCanvas?.classList.remove('is-panning');
      }
      updateRecenterButtonState();
    };

    trackMapViewport.addEventListener('pointerup', finishMapPan);
    trackMapViewport.addEventListener('pointercancel', finishMapPan);
  }

  function setTrackViewState(mode) {
    state.trackMode = mode;
    if (mode === 'empty') {
      chipModeActiveTrip?.classList.remove('active');
      chipModeNoTrip?.classList.add('active');
      trackSheetActiveState?.classList.add('hidden');
      trackSheetEmptyState?.classList.remove('hidden');

      if (peekDriverAvatar) peekDriverAvatar.textContent = '⚡';
      if (peekDriverName) peekDriverName.textContent = 'No Active Trip';
      if (peekStatusSub) peekStatusSub.textContent = 'There are no trips right now and upcoming';
      if (peekDotPulse) peekDotPulse.style.background = '#64748B';

      if (trackLiveRoutePath) trackLiveRoutePath.style.opacity = '0.15';
      if (mapFloatingEta) mapFloatingEta.classList.add('hidden');
      if (mapStatusIndicator) mapStatusIndicator.textContent = 'GPS Standby • No active trip';
      const dot = document.querySelector('.live-dot-pulse');
      if (dot) dot.style.background = '#64748B';
    } else {
      chipModeNoTrip?.classList.remove('active');
      chipModeActiveTrip?.classList.add('active');
      trackSheetEmptyState?.classList.add('hidden');
      trackSheetActiveState?.classList.remove('hidden');

      const dName = currentAcceptedDriver?.name || 'Vikram Singh';
      const dAvatar = currentAcceptedDriver?.avatar || 'VS';
      if (peekDriverAvatar) peekDriverAvatar.textContent = dAvatar;
      if (peekDriverName) peekDriverName.textContent = dName;
      if (peekStatusSub) peekStatusSub.textContent = 'Arriving in 4 min • Mercedes C-Class';
      if (peekDotPulse) peekDotPulse.style.background = '#10B981';

      if (trackLiveRoutePath) trackLiveRoutePath.style.opacity = '1';
      if (mapFloatingEta) mapFloatingEta.classList.remove('hidden');
      if (mapStatusIndicator) mapStatusIndicator.textContent = 'GPS Live • 1.8 km away';
      const dot = document.querySelector('.live-dot-pulse');
      if (dot) dot.style.background = '#10B981';
    }
  }

  function syncTrackTripState(status, driverInfo = null) {
    if (status === 'confirmed' && driverInfo) {
      setTrackViewState('active');
      if (trackDriverAvatar) trackDriverAvatar.textContent = driverInfo.avatar;
      if (trackDriverName) trackDriverName.textContent = driverInfo.name;
      if (trackDriverRating) trackDriverRating.textContent = driverInfo.rating;
      if (trackAssignedCar) {
        trackAssignedCar.textContent = `${state.selectedCar.make || 'Mercedes-Benz'} • ${state.selectedCar.regNo || 'KA 01 MJ 4402'}`;
      }
      if (trackStatusTitle) trackStatusTitle.textContent = `Chauffeur en route (${driverInfo.name})`;
      if (trackEtaPill) trackEtaPill.textContent = 'ETA 4 mins';
      if (mapFloatingEtaTime) mapFloatingEtaTime.textContent = '4 MIN';
      if (mapFloatingEtaSub) mapFloatingEtaSub.textContent = `${driverInfo.name} • En Route`;
      if (mapStatusIndicator) mapStatusIndicator.textContent = `GPS Live • ${driverInfo.name} (1.8 km away)`;
      
      if (peekDriverAvatar) peekDriverAvatar.textContent = driverInfo.avatar;
      if (peekDriverName) peekDriverName.textContent = driverInfo.name;
      if (peekStatusSub) peekStatusSub.textContent = `Arriving in 4 min • ${state.selectedCar.make || 'Your Car'}`;

      const fromText = searchFromDisp?.textContent || 'Home, 4th Block, Koramangala';
      const toText = searchToDisp?.textContent || 'Kempegowda Int\'l Airport (T2)';
      if (trackPickupDisp) trackPickupDisp.textContent = fromText;
      if (trackDropDisp) trackDropDisp.textContent = toText;
      if (trackFareDisp) trackFareDisp.textContent = dispFareAmount?.textContent ? `₹${dispFareAmount.textContent}` : '₹899';
    } else if (status === 'arrived') {
      if (trackStatusTitle) trackStatusTitle.textContent = 'Chauffeur Arrived at Doorstep';
      if (trackEtaPill) trackEtaPill.textContent = 'Arrived';
      if (mapFloatingEtaTime) mapFloatingEtaTime.textContent = 'ARRIVED';
      if (mapFloatingEtaSub) mapFloatingEtaSub.textContent = 'At your pick-up location';
      if (mapStatusIndicator) mapStatusIndicator.textContent = 'GPS Live • Arrived at Doorstep';
      if (peekStatusSub) peekStatusSub.textContent = 'Chauffeur arrived at doorstep';
    } else if (status === 'started') {
      if (trackStatusTitle) trackStatusTitle.textContent = 'Trip Started • Chauffeur Driving';
      if (trackEtaPill) trackEtaPill.textContent = 'On The Way';
      if (mapFloatingEtaTime) mapFloatingEtaTime.textContent = 'IN TRANSIT';
      if (mapFloatingEtaSub) mapFloatingEtaSub.textContent = 'Driving customer vehicle';
      if (trackSpeedDisp) trackSpeedDisp.textContent = '44 km/h';
      if (mapStatusIndicator) mapStatusIndicator.textContent = 'GPS Live • Safe speed 44 km/h';
      if (peekStatusSub) peekStatusSub.textContent = 'Trip active in progress • 44 km/h';
    } else if (status === 'cancelled') {
      setTrackViewState('empty');
    }
  }

  chipModeActiveTrip?.addEventListener('click', () => {
    setTrackViewState('active');
    showToast('Showing active running trip preview', '📍');
  });

  chipModeNoTrip?.addEventListener('click', () => {
    setTrackViewState('empty');
    showToast('Showing no active or upcoming trips', 'ℹ️');
  });

  btnTrackNow?.addEventListener('click', () => {
    // 1. Minimize popup to reveal the full map!
    minimizeBottomSheet();

    // 2. Smoothly reset/center map on chauffeur location
    resetMapToChauffeur(true);

    const dName = trackDriverName?.textContent || 'Vikram Singh';
    showToast(`Full Map View • Tracking ${dName} live (1.8 km away)`, '📍');
    if (islandActivity && !islandActivity.classList.contains('hidden')) {
      islandActivity.querySelector('.island-text').textContent = `${dName} en route (4 min)`;
    }
  });

  btnTrackBookChauffeur?.addEventListener('click', () => {
    switchNavbarPage('home');
    setTimeout(() => {
      inputFromLoc?.focus();
    }, 200);
    showToast('Select locations to request your chauffeur', '🚗');
  });

  btnRecenterMap?.addEventListener('click', () => {
    resetMapToChauffeur(true);
    showToast('Map centered on Chauffeur location', '⌖');
  });

  let trafficActive = false;
  btnToggleTraffic?.addEventListener('click', () => {
    trafficActive = !trafficActive;
    showToast(trafficActive ? 'Live Traffic: Congestion bypass active' : 'Live Traffic: Clear smooth flow (Green)', '🚦');
  });

  btnTrackCallDriver?.addEventListener('click', () => {
    const dName = trackDriverName?.textContent || 'Vikram Singh';
    showToast(`Calling chauffeur ${dName}...`, '📞');
  });

  btnTrackChatDriver?.addEventListener('click', () => {
    const dName = trackDriverName?.textContent || 'Vikram Singh';
    showToast(`Opening encrypted chat with ${dName}...`, '💬');
  });

  // ==========================================
  // 13. iOS 27 LIQUID DOCK NAVBAR
  // ==========================================
  function updateNavbarPosition(activeItem) {
    if (!activeItem || !navbarBubble) return;
    const offsetLeft = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;
    navbarBubble.style.width = `${itemWidth}px`;
    navbarBubble.style.transform = `translateX(${offsetLeft}px)`;
  }

  navDockItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      switchNavbarPage(tab);
    });
  });

  // ==========================================
  // 14. DEVICE VIEW SWITCHER (iPhone Frame vs Fluid)
  // ==========================================
  btnPhoneView?.addEventListener('click', () => {
    document.body.classList.remove('device-fluid-mode');
    document.body.classList.add('device-mobile-mode');
    btnPhoneView.classList.add('active');
    btnFluidView.classList.remove('active');
    state.deviceMode = 'mobile';
  });

  btnFluidView?.addEventListener('click', () => {
    document.body.classList.remove('device-mobile-mode');
    document.body.classList.add('device-fluid-mode');
    btnFluidView.classList.add('active');
    btnPhoneView.classList.remove('active');
    state.deviceMode = 'fluid';
  });

  // ==========================================
  // 15. INITIALIZATION
  // ==========================================
  switchScreen('onboarding');
  updateFareCalculation();
  updateLocationClearButtons();
  updateBookingButtonState();
  const initialNavTab = document.querySelector('#iosNavbar .nav-dock-item.active') || document.querySelector('#iosNavbar .nav-dock-item[data-tab="home"]');
  if (initialNavTab) {
    updateNavbarPosition(initialNavTab);
  }

  console.log('Ridingo Chauffeur App Initialized — Apple Multi-Page Architecture Active.');
});
