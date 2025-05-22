export const formatDate = (dateString: string | undefined | null): string => {
  if (!dateString) return '-'; // Handle undefined/null/empty string
  
  try {
    const date = new Date(dateString);
    
    // Validasi date object
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString);
      return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '-';
  }
};