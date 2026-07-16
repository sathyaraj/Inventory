import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() {}

  hasPermission(module: string, action: string): boolean {

    // SAFE LOCAL STORAGE READ
    const permissions = JSON.parse(
      localStorage.getItem('permissions') || '[]'
    );

    // SAFETY CHECK
    if (!Array.isArray(permissions)) {
      return false;
    }

    // FIND MODULE
    const permission = permissions.find((x: any) =>

      (x.module || '')
        .toLowerCase()
        .replace(/\s/g, '') ===

      module
        .toLowerCase()
        .replace(/\s/g, '')
    );

    // MODULE NOT FOUND
    if (!permission) {
      return false;
    }

    // RETURN ACTION
    return !!permission[action.toLowerCase()];
  }
}