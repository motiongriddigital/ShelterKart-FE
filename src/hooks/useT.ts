'use client';
import { useContext } from 'react';
import { I18nContext } from '@/i18n/I18nProvider';

export const useT = () => useContext(I18nContext).t;
export const useLang = () => useContext(I18nContext).lang;
