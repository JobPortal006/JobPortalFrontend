import errorMessages from '../Json/Employerregister.json';

export const validateCompanyDetails = (companyDetails) => {
    const errors = {};

    // Validate company name
    if (!companyDetails.company_name.trim()) {
        errors.company_name = errorMessages.companyDetails.company_name.required;
    } else if (!/^[a-zA-Z\s]+$/.test(companyDetails.company_name)) {
        errors.company_name = errorMessages.companyDetails.company_name.onlyAlphabets;
    } else if (/^\s/.test(companyDetails.company_name)) {
        errors.company_name = errorMessages.companyDetails.company_name.noSpace;
    }

    // Validate industry type
    if (!companyDetails.industry_type) {
        errors.industry_type = errorMessages.companyDetails.industry_type;
    }

    // Validate company description
    if (!companyDetails.company_description.trim()) {
        errors.company_description = errorMessages.companyDetails.company_description.required;
    } else if (/^\s/.test(companyDetails.company_description)) {
        errors.company_description = errorMessages.companyDetails.company_description.noSpace;
    }

    // Validate number of employees
    if (!companyDetails.no_of_employees) {
        errors.no_of_employees = errorMessages.companyDetails.no_of_employees;
    }

    // Validate company website link
    if (!companyDetails.company_website_link.trim()) {
        errors.company_website_link = errorMessages.companyDetails.company_website_link.required;
    } else if (!/^https?:\/\/\S+$/.test(companyDetails.company_website_link)) {
        errors.company_website_link = errorMessages.companyDetails.company_website_link.invalidFormat;
    }

    // Validate company logo
    if (!companyDetails.company_logo) {
        errors.company_logo = errorMessages.companyDetails.company_logo.required;
    } else if (companyDetails.company_logo.size > 2 * 1024 * 1024) { // 2MB limit
        errors.company_logo = errorMessages.companyDetails.company_logo.sizeLimit;
    }

    return errors;
};

export const validateCompanyAddress = (companyAddress) => {
    const errors = {};

    // Validate street
    if (!companyAddress.street.trim()) {
        errors.street = errorMessages.companyAddress.street.required;
    } else if (/^\s/.test(companyAddress.street)) {
        errors.street = errorMessages.companyAddress.street.noSpace;
    }

    // Validate city
    if (!companyAddress.city.trim()) {
        errors.city = errorMessages.companyAddress.city.required;
    } else if (!/^[a-zA-Z\s]+$/.test(companyAddress.city)) {
        errors.city = errorMessages.companyAddress.city.onlyAlphabets;
    } else if (/^\s/.test(companyAddress.city)) {
        errors.city = errorMessages.companyAddress.city.noSpace;
    }

    // Validate state
    if (!companyAddress.state.trim()) {
        errors.state = errorMessages.companyAddress.state.required;
    } else if (!/^[a-zA-Z\s]+$/.test(companyAddress.state)) {
        errors.state = errorMessages.companyAddress.state.onlyAlphabets;
    } else if (/^\s/.test(companyAddress.state)) {
        errors.state = errorMessages.companyAddress.state.noSpace;
    }

    // Validate country
    if (!companyAddress.country.trim()) {
        errors.country = errorMessages.companyAddress.country.required;
    } else if (!/^[a-zA-Z\s]+$/.test(companyAddress.country)) {
        errors.country = errorMessages.companyAddress.country.onlyAlphabets;
    } else if (/^\s/.test(companyAddress.country)) {
        errors.country = errorMessages.companyAddress.country.noSpace;
    }

    // Validate pincode
    if (!companyAddress.pincode.trim()) {
        errors.pincode = errorMessages.companyAddress.pincode.required;
    } else if (!/^\d+( \d+)*$/.test(companyAddress.pincode)) {
        errors.pincode = errorMessages.companyAddress.pincode.onlyNumeric;
    }

    // Validate address type
    if (!companyAddress.address_type) {
        errors.address_type = errorMessages.companyAddress.address_type;
    }

    return errors;
};

export const validateContactInformation = (contactInfo) => {
    const errors = {};

    // Validate contact person name
    if (!contactInfo.contact_person_name.trim()) {
        errors.contact_person_name = errorMessages.contactInformation.contact_person_name.required;
    } else if (/^\s/.test(contactInfo.contact_person_name)) {
        errors.contact_person_name = errorMessages.contactInformation.contact_person_name.noSpace;
    } else if (!/^[a-zA-Z\s]+$/.test(contactInfo.contact_person_name)) {
        errors.contact_person_name = errorMessages.contactInformation.contact_person_name.onlyAlphabets;
    }

    // Validate contact person position
    if (!contactInfo.contact_person_position.trim()) {
        errors.contact_person_position = errorMessages.contactInformation.contact_person_position.required;
    } else if (/^\s/.test(contactInfo.contact_person_position)) {
        errors.contact_person_position = errorMessages.contactInformation.contact_person_position.noSpace;
    } else if (!/^[a-zA-Z\s]+$/.test(contactInfo.contact_person_position)) {
        errors.contact_person_position = errorMessages.contactInformation.contact_person_position.onlyAlphabets;
    }

    // Validate email
    if (!contactInfo.email.trim()) {
        errors.email = errorMessages.contactInformation.email.required;
    } else if (!/^\S+@\S+\.\S+$/.test(contactInfo.email)) {
        errors.email = errorMessages.contactInformation.email.invalidFormat;
    }

    // Validate mobile number
    if (!contactInfo.mobile_number.trim()) {
        errors.mobile_number = errorMessages.contactInformation.mobile_number.required;
    } else if (!/^\+?\d{10,14}$/.test(contactInfo.mobile_number)) {
        errors.mobile_number = errorMessages.contactInformation.mobile_number.invalidFormat;
    }

    return errors;
};

