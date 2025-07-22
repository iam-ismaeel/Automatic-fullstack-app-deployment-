export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  prev_page_url: any;
  next_page_url: any;
}

export interface PaginationEvents {
  onPrevious?: (val: number) => void;
  onNext?: (val: number) => void;
  onClickNumber?: (val: number) => void;
}
