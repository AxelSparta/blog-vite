export const imageValidation = (image, maxSizeInMb) => {
  const arrayOfAllowedTypes = ['image/png', 'image/jpeg', 'image/jpg']

  if (!arrayOfAllowedTypes.includes(image.type)) {
    return {
      error: true,
      message: 'Only image files allowed.'
    }
  }

  if (image.size / (1024 * 1024) > maxSizeInMb) {
    return {
      error: true,
      message: `Image too large (max ${maxSizeInMb} mb).`
    }
  }

  return { error: false, message: '' }
}
