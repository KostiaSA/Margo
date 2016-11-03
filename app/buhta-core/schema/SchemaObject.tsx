import {objectClasses} from "../objectClasses";
import {IObjectDesignerFormat} from "../designer/ObjectDesignerFormat";
import {StringAttrEditor} from "../designer/editors/StringAttrEditor";
import {DateTimeAttrEditor} from "../designer/editors/DateTimeAttrEditor";
import {getRandomString} from "../utils/getRandomString";
import {getNewSchemaObjectId} from "./getNewSchemaObjectId";

export interface IPersistentObject {
    _class: string;
    [id: string]: any;
}


export interface ISchemaObject extends IPersistentObject {

    _id?: string;
    parentObjectId?: string;
    name: string;
    description?: string;

    createDate: Date;
    createUserId: string;

    changeDate?: Date;
    changeUserId?: string;

    lockDateTime?: Date;
    lockedByUserId?: string;

    position?: number;

    // prepareNew() {
    //     if (!this.id)
    //         this.id = newSchemaObjectId();
    //     if (!this.name)
    //         this.name = "НовыйОбъект";
    // }

    // getTypeDisplay(): string {
    //     return "Объект";
    // }

    // getDesigner(): JSX.Element {
    //     throwAbstractError();
    //     throw  "fake";
    // }

    // save(): Promise<void|string> {
    //     return this.schema.saveObject(this);
    // }
    //
    // getObjectTypeInfo(): SchemaObjectTypeInfo {
    //     return (this.constructor as any).$$schemaObjectTypeInfo;
    // }

    // $$getDesigner(props: SchemaObjectDesignerProps): JSX.Element {
    //
    //     return (
    //         <SchemaObjectDesigner
    //             {...props}
    //         >
    //         </SchemaObjectDesigner>
    //     );
    //
    // }

    // $$getDesignerWindowSizePosStoreKey(): string {
    //     return this.getObjectTypeInfo().id;
    // }


}

export class PersistentObject<T extends IPersistentObject> {
    constructor(public obj: T) {

    }

    createNew(): T {
        throw "abstract error";
    }

    prepareToSave() {
        throw "abstract error";
    }

    getDesignerFormat(): IObjectDesignerFormat {
        return {
            attributes: [],
            arrays: [],
            getTitle: (obj: IPersistentObject)=> {
                return obj._class
            }
        };
    }
}

export class SchemaObject<T extends ISchemaObject> extends PersistentObject<T> {

    static createNew(): ISchemaObject {
        return {
            _id: getNewSchemaObjectId(),
            _class: "",
            name: "",
            createDate: new Date(),
            createUserId: getRandomString()
        } as ISchemaObject;

    }

    prepareToSave() {
        throw "abstract error";
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        ret.attributes.push({
            _class: StringAttrEditor.getClassName(),
            attrGroup: "объект схемы",
            attrName: "_id",
            attrTitle: "_id",
            isReadonly: true
        });
        ret.attributes.push({
            _class: StringAttrEditor.getClassName(),
            attrGroup: "объект схемы",
            attrName: "name",
            attrTitle: "имя"
        });
        ret.attributes.push({
            _class: StringAttrEditor.getClassName(),
            attrGroup: "объект схемы",
            attrName: "description",
            attrTitle: "описание"
        });

        ret.attributes.push({
            _class: DateTimeAttrEditor.getClassName(),
            attrGroup: "инфо",
            attrName: "createDate",
            attrTitle: "когда создан",
            isReadonly: true
        });

        ret.getTitle = (obj: ISchemaObject)=> {
            return obj.name;
        };

        return ret;
    }

}


// export function newSchemaObjectId(): SchemaObjectId {
//     return getNewGuid();
// }

//
// public virtual void Validate(ValidateErrorList error)
// {
//     if (ID == Guid.Empty)
//         error.AddError(Name, "Пустое поле 'ID'.");
//     if (string.IsNullOrWhiteSpace(Name))
//         error.AddError(Name, "Не заполнено поле 'Имя'.");
// }
//
// //public void Save()
// //{
// //    App.Schema.SchemaObjectsCollection.Save<SchemaObject>(this);
//
// //}
//
// public virtual string DisplayName
// {
//     get
//     {
//         return GetModulePrefix() + Name;
//     }
// }
//
//
// public string GetModulePrefix()
// {
//     var module = GetModule();
//     if (module == null)
//         return "";
//     else
//         return module.Prefix + ".";
// }
//
// public SchemaModule GetModule()
// {
//     if (this is SchemaModule)
//     return null;
// else
//     if (ParentObjectID == null)
//         return null;
//     else
//     {
//         var parent = GetParentObject();
//         if (parent is SchemaModule)
//         return parent as SchemaModule;
//     else
//         return parent.GetModule();
//     }
// }
//
// SchemaObject cached_ParentObject;
// public SchemaObject GetParentObject()
// {
//     if (ParentObjectID == null)
//         return null;
//     else
//     if (cached_ParentObject == null)
//     {
//         cached_ParentObject = App.Schema.GetSampleObject<SchemaObject>((Guid)ParentObjectID);
//     }
//     return cached_ParentObject;
// }
//
//
//
// public event PropertyChangedEventHandler PropertyChanged;
//
// public virtual string GetSchemaDesignerDisplayName()
// {
//     return Name;
// }
//
// public virtual Bitmap GetSchemaDesignerImage()
// {
//     return GetImage();
// }
//
// public virtual Color GetSchemaDesinerColor()
// {
//     return Color.Black;
// }
//
// public virtual string GetSchemaDesignerDescription()
// {
//     return Description;
// }
//
//
// public virtual DateTime? GetSchemaDesignerChangeDate()
// {
//     if (ChangeDate == null)
// return CreateDate;
// else
// return ChangeDate;
// }
//
// public virtual string GetSchemaDesignerChangeUser()
// {
//     if (ChangeUserID == null)
//         return App.Schema.GetObjectName(CreateUserID);
//     else
//         return App.Schema.GetObjectName(ChangeUserID);
// }
//
// public void SaveChanges()
// {
//     App.Schema.SaveObject(this);
//     needSave = false;
//
// }
//
// public void CancelChanges()
// {
//     needSave = false;
// }

