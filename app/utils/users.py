"""
Utility helper functions for users authentication
"""
from typing import Tuple


def validate_passwords_match(password: str, confirm_password: str) -> bool:
    """
    Validate that password and confirm password match
    """
    return password == confirm_password


def is_valid_email(email: str) -> bool:
    """
    Validate email format
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def is_valid_phone_number(phone_number: str) -> bool:
    """
    Validate phone number format (basic validation)
    Must contain only digits and optional +, -, (, ) characters
    """
    import re
    pattern = r'^[\+]?[\d\s\-\(\)]{10,}$'
    return re.match(pattern, phone_number) is not None


def is_email_or_phone(value: str) -> Tuple[str, bool]:
    """
    Determine if the value is an email or phone number
    Returns: (field_name, is_email) - field_name is 'email' or 'phone_number'
    """
    if '@' in value:
        return ('email', True)
    else:
        return ('phone_number', False)
