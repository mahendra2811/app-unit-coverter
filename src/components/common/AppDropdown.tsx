import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Icon, UIIcons } from './Icon';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights, Shadows } from '../../constants/colors';

interface DropdownItem {
  label: string;
  value: string;
}

interface AppDropdownProps {
  items: DropdownItem[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  style?: ViewStyle;
}

export const AppDropdown: React.FC<AppDropdownProps> = ({
  items,
  selectedValue,
  onValueChange,
  label,
  placeholder = 'Select an option',
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const selectedItem = items.find(item => item.value === selectedValue);

  const dropdownStyle = [
    styles.dropdown,
    {
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
  ];

  const labelStyle = [
    styles.label,
    {
      color: colors.text,
    },
  ];

  const selectedTextStyle = [
    styles.selectedText,
    {
      color: selectedItem ? colors.text : colors.textSecondary,
    },
  ];

  const modalContentStyle = [
    styles.modalContent,
    {
      backgroundColor: colors.surface,
    },
    Shadows.lg,
  ];

  const modalHeaderStyle = [
    styles.modalHeader,
    {
      borderBottomColor: colors.border,
    },
  ];

  const modalTitleStyle = [
    styles.modalTitle,
    {
      color: colors.text,
    },
  ];

  const itemStyle = [
    styles.item,
    {
      borderBottomColor: colors.border,
    },
  ];

  const itemTextStyle = [
    styles.itemText,
    {
      color: colors.text,
    },
  ];

  const selectedItemStyle = [
    styles.selectedItem,
    {
      backgroundColor: colors.primary + '20', // 20% opacity
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={labelStyle}>{label}</Text>}
      
      <TouchableOpacity
        style={dropdownStyle}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={selectedTextStyle}>
          {selectedItem?.label || placeholder}
        </Text>
        <Icon
          family={UIIcons.chevronDown.family}
          name={UIIcons.chevronDown.name}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={modalContentStyle}>
            <View style={modalHeaderStyle}>
              <Text style={modalTitleStyle}>
                {label || 'Select an option'}
              </Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Icon
                  family={UIIcons.close.family}
                  name={UIIcons.close.name}
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    itemStyle,
                    item.value === selectedValue && selectedItemStyle,
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={itemTextStyle}>{item.label}</Text>
                  {item.value === selectedValue && (
                    <Icon
                      family={UIIcons.checkmark.family}
                      name={UIIcons.checkmark.name}
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  selectedText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  closeButton: {
    padding: Spacing.xs,
  },
  list: {
    maxHeight: 400,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  selectedItem: {
    // backgroundColor will be set dynamically
  },
  itemText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
});