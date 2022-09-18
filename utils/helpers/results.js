'use strict';

export function Ok(value) {
  return { success: true, value };
}

export function HandleError(error, valid, forbidden = false) {
  return {
    success: false,
    valid: valid,
    forbidden: forbidden,
    error: error,
  };
}
