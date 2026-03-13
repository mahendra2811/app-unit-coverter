import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
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

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.dropdown, { borderColor: colors.border, backgroundColor: colors.backgroundSecondary }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectedText, { color: selectedItem ? colors.text : colors.textTertiary }]} numberOfLines={1}>
          {selectedItem?.label || placeholder}
        </Text>
        <Icon
          family={UIIcons.chevronDown.family}
          name={UIIcons.chevronDown.name}
          size={18}
          color={colors.textSecondary}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        />
        <View style={[styles.modalContent, { backgroundColor: colors.surface }, Shadows.xl]}>
          {/* Drag Handle */}
          <View style={styles.dragHandleRow}>
            <View style={[styles.dragHandle, { backgroundColor: colors.borderSecondary }]} />
          </View>

          {/* Header */}
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {label || 'Select an option'}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon
                family={UIIcons.close.family}
                name={UIIcons.close.name}
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* List */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const isSelected = item.value === selectedValue;
              return (
                <TouchableOpacity
                  style={[
                    styles.item,
                    { borderBottomColor: colors.border },
                    isSelected && { backgroundColor: colors.primary + '15' },
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.itemText,
                    { color: isSelected ? colors.primary : colors.text },
                    isSelected && { fontWeight: FontWeights.semibold },
                  ]}>
                    {item.label}
                  </Text>
                  {isSelected && (
                    <Icon
                      family={UIIcons.checkmark.family}
                      name={UIIcons.checkmark.name}
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />

          {/* Safe area bottom padding */}
          <View style={{ height: Platform.OS === 'ios' ? 24 : 16 }} />
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
    fontWeight: FontWeights.medium,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dropdown: {
    borderWidth: 1.5,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 52,
  },
  selectedText: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    flex: 1,
    marginRight: Spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    maxHeight: '70%',
  },
  dragHandleRow: {
    alignItems: 'center',
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: BorderRadius.full,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modalTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  list: {
    maxHeight: 320,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
});
