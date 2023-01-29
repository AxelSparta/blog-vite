export const imageValidation = (image, maxSizeInMb) => {
  const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg']

  if (!array_of_allowed_file_types.includes(image.type))
    return {
      error: true,
      message: 'Only image files allowed.'
    }

  if (image.size / (1024 * 1024) > maxSizeInMb)
    return {
      error: true,
      message: `Image too large (max ${maxSizeInMb} mb).`
    }

  return { error: false }
}
