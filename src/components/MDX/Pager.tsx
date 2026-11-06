/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import Link from 'next/link';

export interface PagerProps {
  current: number;
  total: number;
  base?: string;
}

function pageHref(base: string, page: number) {
  return page === 1 ? base : `${base}/page/${page}`;
}

export default function Pager({current, total, base = '/blog'}: PagerProps) {
  if (total <= 1) {
    return null;
  }
  const pages = Array.from({length: total}, (_, i) => i + 1);
  return (
    <nav
      aria-label="Blog pages"
      className="flex flex-wrap items-center justify-center gap-3 mt-12 text-lg">
      {current > 1 ? (
        <Link
          href={pageHref(base, current - 1)}
          className="text-link dark:text-link-dark hover:underline">
          Previous
        </Link>
      ) : (
        <span className="text-tertiary dark:text-tertiary-dark">Previous</span>
      )}
      {pages.map((page) =>
        page === current ? (
          <span
            key={page}
            aria-current="page"
            className="font-bold text-primary dark:text-primary-dark">
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={pageHref(base, page)}
            className="text-link dark:text-link-dark hover:underline">
            {page}
          </Link>
        )
      )}
      {current < total ? (
        <Link
          href={pageHref(base, current + 1)}
          className="text-link dark:text-link-dark hover:underline">
          Next
        </Link>
      ) : (
        <span className="text-tertiary dark:text-tertiary-dark">Next</span>
      )}
    </nav>
  );
}
