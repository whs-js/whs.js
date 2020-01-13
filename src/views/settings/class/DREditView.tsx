/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { ScrollView, TextInput } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import ClassComponent from "../../../components/blocks/ClassComponent";
import { HeaderCancelButton, HeaderSaveButton } from "../../../components/header/HeaderButtons";
import NavigationKeyboardAvoidingView from "../../../components/NavigationKeyboardAvoidingView";
import BlockColorPicker from "../../../components/settings/BlockColorPicker";
import SchoolDayPicker from "../../../components/settings/SchoolDayPicker";
import { SettingsParams } from "../../../navigators/SettingsNavigator";
import { classesStyle, settingsViewStyles, tableViewStyle } from "../../../styles/layout/default";
import { deleteClassAlert, discardChangesAlert } from "../../../util/alerts";
import { BlockColor } from "../../../util/blocks/blockColor";
import { SchoolDay } from "../../../util/calendar/types";
import { useDR } from "../../../util/hooks/classes/useDR";
import useOverrideBackButton from "../../../util/hooks/useOverrideBackButton";

dayjs.extend(useCustomFormat);

/** The dr configure view */
export default function DREditView() {
    const route = useRoute<RouteProp<SettingsParams, "ConfigureDR">>();
    const navigation = useNavigation<StackNavigationProp<SettingsParams, "ConfigureDR">>();

    const DR = useDR(route.params.drId);

    const goBack = () => {
        if (DR.updated) {
            discardChangesAlert(() => navigation.goBack());
        } else {
            navigation.goBack();
        }
    };
    const done = () => {
        DR.save();
        navigation.goBack();
    };

    useOverrideBackButton(goBack);

    navigation.setOptions({
        headerLeft: () => <HeaderCancelButton onPress={goBack} />,
        headerRight: () => <HeaderSaveButton onPress={done} disabled={!DR.updated} />,
    });

    const pomptDelete = () =>
        deleteClassAlert(() => {
            DR.delete();
            navigation.goBack();
        });

    const updateBlock = (block: BlockColor) => DR.update({ block });
    const updateRoom = (room: string) => DR.update({ room });
    const updateTeacher = (teacher: string) => DR.update({ teacher });

    const toggleMeet = (day: SchoolDay) => DR.update(pre => ({ meets: { ...pre.meets, [day]: !pre.meets[day] } }));

    return (
        <NavigationKeyboardAvoidingView>
            <ScrollView>
                <TableView>
                    <BlockColorPicker value={DR.tempValue.block} onPick={updateBlock} />
                    <SchoolDayPicker value={DR.tempValue.meets} onToggle={toggleMeet} blockColorRestraint={DR.tempValue.block} />
                    <Section header="Basic Info">
                        <Cell cellContentView={<TextInput placeholder="Teacher" value={DR.tempValue.teacher} onChangeText={updateTeacher} style={settingsViewStyles.textInput} />} />
                        <Cell cellContentView={<TextInput placeholder="Room" value={DR.tempValue.room} onChangeText={updateRoom} style={settingsViewStyles.textInput} />} />
                    </Section>
                    <Section header="Example">
                        <Cell cellContentView={<ClassComponent block={DR.tempValue.block} name="DR" room={DR.tempValue.room} teacher={DR.tempValue.teacher} start={dayjs("9:51 AM", "h:mm A")} end={dayjs("10:50 AM", "h:mm A")} style={classesStyle.outerContainerEditView} />} />
                    </Section>
                    <Section>
                        <Cell title={"Delete"} titleTextStyle={tableViewStyle.redbutton} onPress={pomptDelete} />
                    </Section>
                </TableView>
            </ScrollView>
        </NavigationKeyboardAvoidingView>
    );
}