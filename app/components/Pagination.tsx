import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PaginationProps } from '@/app/types/category';
import styles from '@/app/styles/pagination.styles';
import getPageNumbers from '@/app/utils/pagination';
export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onNextPage,
  onPrevPage,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <View style={styles.paginationContainer}>
      <View style={styles.paginationButtonsContainer}>
        <TouchableOpacity
          style={[styles.navigationButton, currentPage === 1 && styles.disabledNavigationButton]}
          onPress={onPrevPage}
          disabled={currentPage === 1}
          activeOpacity={currentPage === 1 ? 1 : 0.7}
        >
          <Text
            style={[
              styles.navigationButtonText,
              currentPage === 1 && styles.disabledNavigationButtonText,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        <View style={styles.pageNumbersContainer}>
          {pageNumbers.map((page, index) =>
            page === -1 ? (
              <Text key={`ellipsis-${index}`} style={styles.ellipsis}>
                ...
              </Text>
            ) : (
              <TouchableOpacity
                key={page}
                style={[styles.pageNumber, currentPage === page && styles.currentPage]}
                onPress={() => onPageChange(page)}
              >
                <Text
                  style={[styles.pageNumberText, currentPage === page && styles.currentPageText]}
                >
                  {page}
                </Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.navigationButton,
            (currentPage === totalPages || totalPages === 0) && styles.disabledNavigationButton,
          ]}
          onPress={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          activeOpacity={currentPage === totalPages || totalPages === 0 ? 1 : 0.7}
        >
          <Text
            style={[
              styles.navigationButtonText,
              (currentPage === totalPages || totalPages === 0) &&
                styles.disabledNavigationButtonText,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.pageIndicator}>
        {totalItems > 0
          ? `${startIndex + 1}-${Math.min(endIndex, totalItems)} of ${totalItems}`
          : 'No results'}
      </Text>
    </View>
  );
}
