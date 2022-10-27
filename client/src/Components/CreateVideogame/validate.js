export default function validate(form){
    let errors = {};
    if (!form.name) {
        errors.name = 'Name is required'
    }
    if (form.name && form.name.length > 255) {
        errors.name = 'Name must be shorted'
    }
    if (!form.description) {
        errors.description = 'Description is required'
    }
    if (form.platforms.length === 0) {
        errors.platforms = 'At least a platform is required'
    }
    if (form.img) {
        if (!((form.img).match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g))) {
            errors.img = 'Image URL not valid'
        }
    }
    return errors
}