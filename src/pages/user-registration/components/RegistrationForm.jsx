import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength++;
    if (/[A-Z]/?.test(password)) strength++;
    if (/[a-z]/?.test(password)) strength++;
    if (/[0-9]/?.test(password)) strength++;
    if (/[^A-Za-z0-9]/?.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Fair';
      case 4: return 'Good';
      case 5: return 'Strong';
      default: return 'Very Weak';
    }
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1: return 'bg-error';
      case 2: return 'bg-warning';
      case 3: return 'bg-accent';
      case 4: return 'bg-success';
      case 5: return 'bg-primary';
      default: return 'bg-error';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.displayName?.trim()) {
      newErrors.displayName = 'Display name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation for existing email
      if (formData?.email === 'existing@example.com') {
        setErrors({ email: 'An account with this email already exists' });
        setIsLoading(false);
        return;
      }

      // Success - redirect to dashboard
      navigate('/waste-log-dashboard');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-xl shadow-subtle border border-border p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="UserPlus" size={32} className="text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground font-body">
            Start tracking your environmental impact today
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors?.general && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-error text-sm font-body">{errors?.general}</p>
            </div>
          )}

          {/* Display Name */}
          <Input
            label="Display Name"
            type="text"
            placeholder="Enter your display name"
            value={formData?.displayName}
            onChange={(e) => handleInputChange('displayName', e?.target?.value)}
            error={errors?.displayName}
            required
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-caption text-muted-foreground">
                  Password Strength
                </span>
                <span className={`text-xs font-caption font-medium ${
                  passwordStrength >= 4 ? 'text-success' : 
                  passwordStrength >= 3 ? 'text-accent' : 'text-warning'
                }`}>
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5]?.map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full ${
                      level <= passwordStrength 
                        ? getPasswordStrengthColor(passwordStrength)
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <Checkbox
              label="I agree to the Terms of Service and Privacy Policy"
              checked={formData?.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
              error={errors?.acceptTerms}
              required
            />
            <div className="flex flex-wrap gap-1 text-xs text-muted-foreground font-body">
              <span>By creating an account, you agree to our</span>
              <button type="button" className="text-primary hover:underline">
                Terms of Service
              </button>
              <span>and</span>
              <button type="button" className="text-primary hover:underline">
                Privacy Policy
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="UserPlus"
            iconPosition="left"
            className="mt-6"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground font-body">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/user-login')}
              className="text-primary hover:text-primary/80 font-semibold transition-smooth"
            >
              Sign in instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;